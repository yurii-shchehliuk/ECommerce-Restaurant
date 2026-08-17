using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stripe;
using System.IO;
using System.Threading.Tasks;
using WebApi.Domain.Core;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Controllers;
using Order = WebApi.Domain.Entities.OrderAggregate.Order;

namespace API.Basket.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly string _whSecret;
        private readonly string _stripeKey;
        private readonly ILogger<IPaymentService> _logger;
        public PaymentsController(IPaymentService paymentService, ILogger<IPaymentService> logger, IConfiguration config)
        {
            _logger = logger;
            _paymentService = paymentService;
            _whSecret = config.GetSection("StripeSettings:WhSecret").Value;
            _stripeKey = config.GetSection("StripeSettings:SecretKey").Value;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            // A deployment without a Stripe key has no payment provider, which is a fact
            // about the deployment rather than a failure of this request. 503 says so and
            // lets the checkout wizard offer the unpaid path instead of the card step;
            // throwing here would surface as a 500 and an error page.
            if (string.IsNullOrWhiteSpace(_stripeKey))
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    Result<CustomerBasket>.Fail("Card payment is not configured on this deployment."));
            }

            var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(Result<CustomerBasket>.Fail("Problem with your basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment succeeded for intent {IntentId}", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    _logger.LogInformation("Order {OrderId} updated to payment received", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment failed for intent {IntentId}", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Order {OrderId} updated to payment failed", order.Id);
                    break;
            }

            return new EmptyResult();
        }

    }
}