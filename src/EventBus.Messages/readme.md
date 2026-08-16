# EventBus.Messages

The shared contracts assembly. Both `API.Basket` (producer) and `API.Admin`
(consumer) reference this project, so the message they disagree about is a
compile error rather than a runtime surprise.

```
Contracts/       OrderPlaced, OrderPlacedItem — the wire format
Abstractions/    IOrderEventSink — where a consumed event gets recorded
Consumers/       OrderPlacedConsumer : IConsumer<OrderPlaced>
Common/          queue name and the configuration key for the broker address
EventBusExtensions.cs  AddOrderEventPublishing() / AddOrderEventConsuming()
```

## Why there is no ProjectReference

This project deliberately references no other project in the solution. The
contract used to be `OrderMessageDTO`, which sat in `WebApi.Domain` and embedded
the whole `Order` **entity** — so any change to a persistence model was also,
invisibly, a change to the public wire format, and adding a navigation property
could have started serialising a lazily-loaded object graph onto a queue.
`OrderPlaced` is flat, carries only primitives, and cannot move unless someone
edits this assembly.

## Topology

MassTransit over RabbitMQ.

- The producer publishes `OrderPlaced`. MassTransit declares a fanout exchange
  named after the message type (`EventBus.Messages.Contracts:OrderPlaced`).
- The consumer binds a durable queue, `owlet-order-placed`, to that exchange.
  Durable is the point: an order placed while `API.Admin` is stopped waits on
  the broker and is consumed when Admin comes back.
- Delivery is at-least-once, so `IOrderEventSink` implementations must be
  idempotent. The one in `WebApi.Infrastructure` enforces this with a unique
  index on `EventId` and returns `false` for a duplicate.

## What is still missing

There is no transactional outbox. `OrderService` commits the order and then
publishes; a crash in between loses the event. Doing it properly means
MassTransit's EF Core outbox writing the message into `appdb` inside the same
`SaveChanges` as the order, with a delivery service draining it. That is the
next change to this project, and until it exists the failure mode is documented
rather than fixed.
