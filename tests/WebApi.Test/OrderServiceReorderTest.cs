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
    /// Regression tests for a defect found by placing two orders against the running
    /// stack rather than by reading the code.
    ///
    /// <c>OrderByPaymentIntentIdSpecification</c> compares <c>PaymentIntentId</c> for
    /// equality. With a null intent that matches every order that also has a null
    /// intent, so the second checkout of the day found the *first* order ever placed,
    /// deleted it, and called <c>CreateOrUpdatePaymentIntent(null)</c> - which throws
    /// when Stripe is not configured. The visible symptom was that the first order
    /// after a fresh start always worked and every later one returned 500.
    /// </summary>
    public class OrderServiceReorderTest
    {
        [Fact]
        public async Task NoPaymentIntent_DoesNotLookForAnExistingOrderOrTouchStripe()
        {
            var repository = new SpyOrderRepository { ExistingOrder = new Order { Id = 99 } };
            var payments = new SpyPaymentService();
            var sut = new OrderService(
                new FakeBasket(paymentIntentId: null!), new FakeUnitOfWork(repository), payments, new NullNotification());

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.NotNull(order);
            Assert.False(repository.SpecificationWasQueried);
            Assert.Empty(repository.Deleted);
            Assert.Equal(0, payments.CreateOrUpdateCalls);
        }

        [Fact]
        public async Task WithAPaymentIntent_ReplacesThePreviousAttempt()
        {
            // The behaviour the guard must not break: retrying a checkout against the
            // same Stripe intent replaces the earlier order rather than duplicating it.
            var previous = new Order { Id = 99, PaymentIntentId = "pi_test_123" };
            var repository = new SpyOrderRepository { ExistingOrder = previous };
            var payments = new SpyPaymentService();
            var sut = new OrderService(
                new FakeBasket("pi_test_123"), new FakeUnitOfWork(repository), payments, new NullNotification());

            var order = await sut.CreateOrderAsync("bob@example.com", 1, "basket-1", new Address());

            Assert.True(repository.SpecificationWasQueried);
            Assert.Same(previous, Assert.Single(repository.Deleted));
            Assert.Equal(1, payments.CreateOrUpdateCalls);
            Assert.Equal("pi_test_123", order.PaymentIntentId);
        }

        #region fakes

        private sealed class NullNotification : IOrderProcessingNotification
        {
            public Task OrderPlacedAsync(Order order, string buyerEmail, string paymentIntentId, CancellationToken cancellationToken = default)
                => Task.CompletedTask;
        }

        private sealed class FakeBasket : IBasketRepository
        {
            private readonly string _paymentIntentId;
            public FakeBasket(string paymentIntentId) => _paymentIntentId = paymentIntentId;

            public Task<CustomerBasket> GetBasketAsync(string basketId) => Task.FromResult(new CustomerBasket
            {
                Id = basketId,
                PaymentIntentId = _paymentIntentId,
                Items = new List<BasketItem> { new BasketItem { Id = 1, Quantity = 1, Price = 1m } }
            });

            public Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket) => Task.FromResult(basket);
            public Task<bool> DeleteBasketAsync(string basketId) => Task.FromResult(true);
        }

        private sealed class SpyPaymentService : IPaymentService
        {
            public int CreateOrUpdateCalls { get; private set; }

            public Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
            {
                CreateOrUpdateCalls++;
                return Task.FromResult(new CustomerBasket());
            }

            public Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId) => Task.FromResult(new Order());
            public Task<Order> UpdateOrderPaymentFailed(string paymentIntentId) => Task.FromResult(new Order());
        }

        private sealed class FakeUnitOfWork : IUnitOfWork
        {
            private readonly SpyOrderRepository _orders;
            private readonly Dictionary<Type, object> _others = new();

            public FakeUnitOfWork(SpyOrderRepository orders) => _orders = orders;

            public Task<int> Complete() => Task.FromResult(1);

            public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
            {
                if (typeof(TEntity) == typeof(Order)) return (IGenericRepository<TEntity>)(object)_orders;

                if (!_others.TryGetValue(typeof(TEntity), out var repo))
                {
                    repo = new StubRepository<TEntity>();
                    _others[typeof(TEntity)] = repo;
                }

                return (IGenericRepository<TEntity>)repo;
            }

            public void Dispose() { }
        }

        private sealed class SpyOrderRepository : IGenericRepository<Order>
        {
            public Order? ExistingOrder { get; set; }
            public bool SpecificationWasQueried { get; private set; }
            public List<Order> Deleted { get; } = new();

            public Task<Order> GetEntityWithSpec(ISpecification<Order> spec)
            {
                SpecificationWasQueried = true;
                return Task.FromResult(ExistingOrder!);
            }

            public Task DeleteAsync(Order entity)
            {
                Deleted.Add(entity);
                return Task.CompletedTask;
            }

            public Task AddAsync(Order entity) => Task.CompletedTask;
            public Task DeleteAsync(int id) => Task.CompletedTask;
            public Task Update(Order entity) => Task.CompletedTask;
            public Task<Order> FindByIdAsync(int id) => Task.FromResult(new Order());
            public Task<IReadOnlyList<Order>> ListAllAsync() => Task.FromResult<IReadOnlyList<Order>>(new List<Order>());
            public Task<IReadOnlyList<Order>> ListAsync(ISpecification<Order> spec) => Task.FromResult<IReadOnlyList<Order>>(new List<Order>());
            public Task<int> CountAsync(ISpecification<Order> spec) => Task.FromResult(0);
            public IQueryable<Order> FindBy(Expression<Func<Order, bool>> predicate) => new List<Order>().AsQueryable();
            public IQueryable<Order> FindBy(Expression<Func<Order, bool>> predicate, string include) => new List<Order>().AsQueryable();
        }

        private sealed class StubRepository<T> : IGenericRepository<T> where T : class
        {
            public Task<T> FindByIdAsync(int id)
            {
                object result = typeof(T) == typeof(Product)
                    ? new Product { Id = id, Name = "Item", Price = 1m }
                    : typeof(T) == typeof(DeliveryMethod)
                        ? new DeliveryMethod { Id = id, Price = 0m }
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
