Restaurant application based on .NET 5 (EF Core, Swagger, JWT, Stripe, AutoMapper,...) and Angular 14 (RxJS, Nxg-bootstrap, xng-breadcrumb, bootswatch), RabbitMQ, Redis, MSSQL

Regular user's functionality:
* JWT authentication
* Meals ordering
* SignalR online chat
* Stripe payment
* RabbitMQ messages
* Redis basket

Admin's functionality:
* SignalR online chat
* User CRUD
* Meals CRUD
* RabbitMQ

## List of micro-services and infrastructure components

<table>
   <thead>
    <th>№</th>
    <th>Service</th>
    <th>Description</th>
	<th>Endpoints</th>
  </thead>
  <tbody>
    <tr>
        <td align="center">1.</td>
        <td>Identity API</td>
        <td>Identity management service, powered by JWT token</td>
        <td>
            <a href="#">dev</a> | <a href="#">prod</a>
        </td>
    </tr>
    <tr>
        <td align="center">2.</td>
        <td>Basket API</td>
        <td>Manages customer basket in order to keep items on in-memory cache using Redis. RabbitMQ messages.</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
    <tr>
        <td align="center">3.</td>
        <td>WebAPI</td>
        <td>Angular web client</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
	 <tr>
        <td align="center">4.</td>
        <td>Admin API (tbd)</td>
        <td>Manages customer & orders (tbd). CQRS MediatR. Serilog</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
  </tbody>  
</table>

## Asynchronous services with synchronous and asynchronous communication

### nginx docker container 
https://gist.github.com/dahlsailrunner/679e6dec5fd769f30bce90447ae80081

### redis
https://chocolatey.org/install
cmd: redis-server
	 redis-cli

## Launching
Wether set docker-compose as startup either set all the API projects