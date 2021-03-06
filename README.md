Restaurant application based on .Net Core 3.1 (EntityFrameworkCore, Swagger, JWT Bearer, Stripe) and Angular 12 (RxJS, Nxg-bootstrap, xng-breadcrumb, bootswatch)
App created as two separate projects, servers located on https://localhost:5001 | client located on https://localhost:4200

Regular user's functionality:
* JWT authentication
* Meals ordering
* SignalR online chat
* Stripe payment

Admin's functionality:
* SignalR online chat
* User CRUD
* Meals CRUD

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
        <td>Manages customer basket in order to keep items on in-memory cache using redis</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
    <tr>
        <td align="center">3.</td>
        <td>Base API</td>
        <td>Manages data for showing restaurant menu</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
	<tr>
        <td align="center">5.</td>
        <td>WebClient</td>
        <td>Angular web client</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
	 <tr>
        <td align="center">4.</td>
        <td>Admin API (tbd)</td>
        <td>Manages customer & orders (tbd)</td>
        <td>
            <a href="#">dev</a> |
            <a href="#">prod</a>
        </td>
    </tr>
  </tbody>  
</table>
