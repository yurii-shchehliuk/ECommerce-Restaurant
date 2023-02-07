## RabbitMQ EventBus
Bounded context is an intermediary between services for asyncronous communication.

#Tutorial
Exchange type: direct
Queue routing keys: fast, normal, slow

Exchange type: Topic
Queue routing keys: package.*.international, #.national, package.fast.national
i.e. exactWord, * anyWord, # everything

Exchange type: Fanout
Routing key is ignored and message sent to all the bound queues

Basic msg constants: RabbitMq[Uri+credentials/Host], Exchange, Queue, NotificationQueue

File Structure: Messaging, Notification.Service, Registration.Service

##Flags
Acks: 
	Consumer tells TabbitMQ to delete the message from the queue;
	NoAck bool when registering consumer;
	Unacked messages are requeued; redelivered flag;
	Dead letter exchange

Publisher confirms: 
	Producer gets an acknowledgement when message is queued;
	Possible responses: Ack and Nack; Implement re-send strategy yourself

Mandatory:
	If not the message send back to the producer;
	Flag to set when doing BasicPublish;
	Ensures that the message can be routed to a queue;

##MassTransit
