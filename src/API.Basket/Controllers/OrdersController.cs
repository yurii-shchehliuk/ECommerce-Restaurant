using API.Basket.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Constants;
using WebApi.Domain.Core;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Controllers;

namespace API.Basket.Controllers
{
    /// <summary>
    /// Every action here reads or writes a named buyer's order, so the whole controller
    /// requires a validated JWT. The email the actions work from comes from the token's
    /// claims, never from the request body, so a signed-in caller can only reach their
    /// own orders.
    /// </summary>
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if (order == null) return BadRequest(Result<OrderDto>.Fail("Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound(Result<OrderToReturnDto>.Fail("Not found"));

            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }

        /// <summary>
        /// Every buyer's orders, including their delivery address. That is other people's
        /// personal data, so it is scoped to the Admin role rather than to any signed-in
        /// user. <c>OrdersAuthorizationTest</c> asserts the anonymous 401.
        /// </summary>
        [HttpGet("allOrders")]
        [Authorize(Roles = UserRole.Admin)]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetOrders();
            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }
    }
}