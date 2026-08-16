using System.Linq.Expressions;
using WebApi.Domain.Entities;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Integration;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Interfaces.Services;
using WebApi.Domain.Specifications;
using WebApi.Infrastructure.Services;
using Xunit;

namespace WebApi.Test
{
    /// <summary>
    /// Checkout is where the synchronous and asynchronous halves of the system meet,
    /// and the ordering of the two operations is the part that is easy to get wrong.
    ///
    /// Hand-written fakes rather than a mocking library: the assertions here are about
    /// call ordering and call counts, which read more clearly recorded than configured.
    /// </summary>
    public class OrderServiceTest
    {
        [Fact]
        public async Task CreateOrder_PublishesExactlyOnce_AfterTheCommit()
        {
            var notification = new RecordingNotification();
            var unitOfWork = new FakeUnitOfWork(saveResult: 1);
            var sut = new OrderService(new FakeBasketRepository(), unitOfWork, new NoopPaymentService(), notification);

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.NotNull(order);
            Assert.Single(notification.Calls);
            Assert.Equal("bob@example.com", notification.Calls[0].BuyerEmail);
            Assert.Equal("pi_test_123", notification.Calls[0].PaymentIntentId);

            // The ordering assertion is the point. Publishing before the commit would
            // let API.Admin record an order that a failed transaction then rolled back,
            // and no amount of consumer-side retry can undo that.
            Assert.True(unitOfWork.CompletedAtTick < notification.Calls[0].Tick);
        }

        [Fact]
        public async Task CreateOrder_DoesNotPublish_WhenNothingWasSaved()
        {
            // Complete() returning 0 means the order is not durable. Announcing an
            // order that does not exist is worse than not announcing one.
            var notification = new RecordingNotification();
            var sut = new OrderService(
                new FakeBasketRepository(), new FakeUnitOfWork(saveResult: 0), new NoopPaymentService(), notification);

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.Null(order);
            Assert.Empty(notification.Calls);
        }

        [Fact]
        public async Task CreateOrder_PricesLinesFromTheDatabase_NotFromTheBasket()
        {
            // The basket in this fixture claims the product costs 0.01; the repository
            // says 12.25 for a quantity of 2. If the subtotal is not 24.50 then a
            // client that edits its own basket in Redis is setting its own price.
            var sut = new OrderService(
                new FakeBasketRepository(), new FakeUnitOfWork(saveResult: 1), new NoopPaymentService(), new RecordingNotification());

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.Equal(24.50m, order.Subtotal);
            Assert.Equal(29.50m, order.GetTotal());
        }

        [Fact]
        public async Task CreateOrder_CarriesTheBasketsPaymentIntentOntoTheOrder()
        {
            // The webhook matches Stripe callbacks to orders by PaymentIntentId, so an
            // order that does not carry the basket's intent can never be marked paid.
            var sut = new OrderService(
                new FakeBasketRepository(), new FakeUnitOfWork(saveResult: 1), new NoopPaymentService(), new RecordingNotification());

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.Equal("pi_test_123", order.PaymentIntentId);
            Assert.Equal(OrderStatus.Pending, order.Status);
        }

        #region fakes

        private sealed record NotificationCall(string BuyerEmail, string PaymentIntentId, long Tick);

        private sealed class RecordingNotification : IOrderProcessingNotification
        {
            public List<NotificationCall> Calls { get; } = new();

            public Task OrderPlacedAsync(Order order, string buyerEmail, string paymentIntentId, CancellationToken cancellationToken = default)
            {
                Calls.Add(new NotificationCall(buyerEmail, paymentIntentId, Clock.Next()));
                return Task.CompletedTask;
            }
        }

        /// <summary>Monotonic counter, so "before" and "after" are assertable.</summary>
        private static class Clock
        {
            private static long _tick;
            public static long Next() => Interlocked.Increment(ref _tick);
        }

        private sealed class FakeBasketRepository : IBasketRepository
        {
            public Task<CustomerBasket> GetBasketAsync(string basketId) => Task.FromResult(new CustomerBasket
            {
                Id = basketId,
                PaymentIntentId = "pi_test_123",
                Items = new List<BasketItem>
                {
                    // Price deliberately wrong; the service must ignore it.
                    new BasketItem { Id = 1, Quantity = 2, Price = 0.01m, ProductName = "Owlet Burger" }
                }
            });

            public Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket) => Task.FromResult(basket);

            public Task<bool> DeleteBasketAsync(string basketId) => Task.FromResult(true);
        }

        private sealed class NoopPaymentService : IPaymentService
        {
            public Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId) => Task.FromResult(new CustomerBasket());
            public Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId) => Task.FromResult(new Order());
            public Task<Order> UpdateOrderPaymentFailed(string paymentIntentId) => Task.FromResult(new Order());
        }

        private sealed class FakeUnitOfWork : IUnitOfWork
        {
            private readonly int _saveResult;
            private readonly Dictionary<Type, object> _repositories = new();

            public FakeUnitOfWork(int saveResult) => _saveResult = saveResult;

            public long CompletedAtTick { get; private set; }

            public Task<int> Complete()
            {
                CompletedAtTick = Clock.Next();
                return Task.FromResult(_saveResult);
            }

            public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
            {
                if (!_repositories.TryGetValue(typeof(TEntity), out var repo))
                {
                    repo = new FakeRepository<TEntity>();
                    _repositories[typeof(TEntity)] = repo;
                }

                return (IGenericRepository<TEntity>)repo;
            }

            public void Dispose() { }
        }

        private sealed class FakeRepository<T> : IGenericRepository<T> where T : class
        {
            public Task<T> FindByIdAsync(int id)
            {
                object result = typeof(T) == typeof(Product)
                    ? new Product { Id = id, Name = "Owlet Burger", Price = 12.25m, PictureUrl = "burger.jpg" }
                    : typeof(T) == typeof(DeliveryMethod)
                        ? new DeliveryMethod { Id = id, ShortName = "Bike", Price = 5.00m }
                        : Activator.CreateInstance<T>()!;

                return Task.FromResult((T)result);
            }

            public Task AddAsync(T entity) => Task.CompletedTask;
            public Task DeleteAsync(T entity) => Task.CompletedTask;
            public Task DeleteAsync(int id) => Task.CompletedTask;
            public Task Update(T entity) => Task.CompletedTask;
            public Task<IReadOnlyList<T>> ListAllAsync() => Task.FromResult<IReadOnlyList<T>>(new List<T>());
            public Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec) => Task.FromResult<IReadOnlyList<T>>(new List<T>());
            public Task<T> GetEntityWithSpec(ISpecification<T> spec) => Task.FromResult<T>(null!);
            public Task<int> CountAsync(ISpecification<T> spec) => Task.FromResult(0);
            public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate) => new List<T>().AsQueryable();
            public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, string include) => new List<T>().AsQueryable();
        }

        #endregion
    }
}
