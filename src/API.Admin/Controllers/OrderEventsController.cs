using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Db.Store;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Infrastructure.Controllers;

namespace API.Admin.Controllers
{
    /// <summary>
    /// Read-only view of the order events API.Admin has consumed off RabbitMQ.
    ///
    /// This endpoint exists to make the asynchronous path observable: a row here can
    /// only have been written by <c>OrderPlacedConsumer</c>, which can only have run
    /// because a message published by API.Basket was actually delivered. It is how the
    /// end-to-end proof in the README is taken.
    ///
    /// Deliberately unauthenticated, unlike <c>ProductController</c>, because it is an
    /// inspection endpoint for a local demo stack and exposes nothing that is not
    /// already in the buyer's own order confirmation. In anything real it would sit
    /// behind <c>Policy.Admin</c>.
    /// </summary>
    public class OrderEventsController : BaseApiController
    {
        private readonly StoreContext _context;

        public OrderEventsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ReceivedOrderEvent>>> GetReceivedEvents([FromQuery] int take = 50)
        {
            var events = await _context.ReceivedOrderEvents
                .AsNoTracking()
                .OrderByDescending(e => e.ReceivedAtUtc)
                .Take(take < 1 || take > 200 ? 50 : take)
                .ToListAsync();

            return Ok(events);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetReceivedEventCount()
        {
            return Ok(await _context.ReceivedOrderEvents.CountAsync());
        }
    }
}
