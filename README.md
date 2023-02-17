Restaurant application based on .NET 6 (EF Core, Swagger, JWT, Stripe, AutoMapper,...) and Angular 14 (RxJS, Nxg-bootstrap, xng-breadcrumb, bootswatch), RabbitMQ, Redis, MSSQL

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
        <td>Manages customer & orders (tbd). CQRS MediatR</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
  </tbody>  
</table>

## Launching
cd build/README.md