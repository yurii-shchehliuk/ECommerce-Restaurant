(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/account/account.service.ts":
/*!********************************************!*\
  !*** ./src/app/account/account.service.ts ***!
  \********************************************/
/*! exports provided: AccountService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountService", function() { return AccountService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");








class AccountService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
        this.currentUserSource = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.currentUser$ = this.currentUserSource.asObservable();
    }
    loadCurrentUser(token) {
        if (token === null) {
            this.currentUserSource.next(null);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = headers.set('Authorization', `Bearer ${token}`);
        return this.http.get(this.baseUrl + 'account', { headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((user) => {
            if (user) {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            }
        }));
    }
    login(values) {
        return this.http.post(this.baseUrl + 'account/login', values).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((user) => {
            if (user) {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            }
        }));
    }
    register(values) {
        return this.http.post(this.baseUrl + 'account/register', values).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((user) => {
            if (user) {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            }
        }));
    }
    logout() {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigateByUrl('/');
    }
    checkEmailExists(email) {
        return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
    }
    getUserAddress() {
        return this.http.get(this.baseUrl + 'account/address');
    }
    updateUserAddress(address) {
        return this.http.put(this.baseUrl + 'account/address', address);
    }
}
AccountService.ɵfac = function AccountService_Factory(t) { return new (t || AccountService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"])); };
AccountService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AccountService, factory: AccountService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AccountService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _core_test_error_test_error_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/test-error/test-error.component */ "./src/app/core/test-error/test-error.component.ts");
/* harmony import */ var _core_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/server-error/server-error.component */ "./src/app/core/server-error/server-error.component.ts");
/* harmony import */ var _core_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/not-found/not-found.component */ "./src/app/core/not-found/not-found.component.ts");
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/guards/auth.guard */ "./src/app/core/guards/auth.guard.ts");









const routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], },
    { path: 'test-error', component: _core_test_error_test_error_component__WEBPACK_IMPORTED_MODULE_3__["TestErrorComponent"], },
    { path: 'server-error', component: _core_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_4__["ServerErrorComponent"], },
    { path: 'not-found', component: _core_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"], },
    { path: 'shop', loadChildren: () => __webpack_require__.e(/*! import() | shop-shop-module */ "shop-shop-module").then(__webpack_require__.bind(null, /*! ./shop/shop.module */ "./src/app/shop/shop.module.ts")).then(mod => mod.ShopModule), },
    { path: 'basket', loadChildren: () => __webpack_require__.e(/*! import() | basket-basket-module */ "basket-basket-module").then(__webpack_require__.bind(null, /*! ./basket/basket.module */ "./src/app/basket/basket.module.ts")).then(mod => mod.BasketModule), },
    {
        path: 'checkout',
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
        loadChildren: () => __webpack_require__.e(/*! import() | checkout-checkout-module */ "checkout-checkout-module").then(__webpack_require__.bind(null, /*! ./checkout/checkout.module */ "./src/app/checkout/checkout.module.ts"))
            .then(mod => mod.CheckoutModule),
    },
    {
        path: 'orders',
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
        loadChildren: () => __webpack_require__.e(/*! import() | orders-orders-module */ "orders-orders-module").then(__webpack_require__.bind(null, /*! ./orders/orders.module */ "./src/app/orders/orders.module.ts"))
            .then(mod => mod.OrdersModule),
    },
    {
        path: 'account',
        loadChildren: () => __webpack_require__.e(/*! import() | account-account-module */ "account-account-module").then(__webpack_require__.bind(null, /*! ./account/account.module */ "./src/app/account/account.module.ts"))
            .then(mod => mod.AccountModule)
    },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _basket_basket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basket/basket.service */ "./src/app/basket/basket.service.ts");
/* harmony import */ var _account_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account/account.service */ "./src/app/account/account.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _core_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/nav-bar/nav-bar.component */ "./src/app/core/nav-bar/nav-bar.component.ts");
/* harmony import */ var _core_section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/section-header/section-header.component */ "./src/app/core/section-header/section-header.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");








class AppComponent {
    constructor(basketService, accountService) {
        this.basketService = basketService;
        this.accountService = accountService;
        this.title = 'Skinet';
    }
    ngOnInit() {
        this.loadBasket();
        this.loadCurrentUser();
    }
    loadCurrentUser() {
        const token = localStorage.getItem('token');
        this.accountService.loadCurrentUser(token).subscribe(() => {
            console.log('loaded user');
        }, error => {
            console.log(error);
        });
    }
    loadBasket() {
        const basketId = localStorage.getItem('basket_id');
        if (basketId) {
            this.basketService.getBasket(basketId).subscribe(() => {
                console.log('initialised basket');
            }, error => {
                console.log(error);
            });
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 7, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-spinner");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Loading...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-nav-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-section-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerComponent"], _core_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_4__["NavBarComponent"], _core_section_header_section_header_component__WEBPACK_IMPORTED_MODULE_5__["SectionHeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"] }, { type: _account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.module */ "./src/app/home/home.module.ts");
/* harmony import */ var _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/interceptors/error.interceptor */ "./src/app/core/interceptors/error.interceptor.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");
/* harmony import */ var _core_interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/interceptors/loading.interceptor */ "./src/app/core/interceptors/loading.interceptor.ts");
/* harmony import */ var _core_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/interceptors/jwt.interceptor */ "./src/app/core/interceptors/jwt.interceptor.ts");













class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_8__["ErrorInterceptor"], multi: true },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_10__["LoadingInterceptor"], multi: true },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_11__["JwtInterceptor"], multi: true },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
            _home_home_module__WEBPACK_IMPORTED_MODULE_7__["HomeModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
        _home_home_module__WEBPACK_IMPORTED_MODULE_7__["HomeModule"],
        ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                    _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
                    _home_home_module__WEBPACK_IMPORTED_MODULE_7__["HomeModule"],
                    ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerModule"]
                ],
                providers: [
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_8__["ErrorInterceptor"], multi: true },
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_10__["LoadingInterceptor"], multi: true },
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_11__["JwtInterceptor"], multi: true },
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/basket/basket.service.ts":
/*!******************************************!*\
  !*** ./src/app/basket/basket.service.ts ***!
  \******************************************/
/*! exports provided: BasketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketService", function() { return BasketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_models_basket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/models/basket */ "./src/app/shared/models/basket.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");







class BasketService {
    constructor(http) {
        this.http = http;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
        this.basketSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.basket$ = this.basketSource.asObservable();
        this.basketTotalSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.basketTotal$ = this.basketTotalSource.asObservable();
        this.shipping = 0;
    }
    createPaymentIntent() {
        return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((basket) => {
            this.basketSource.next(basket);
        }));
    }
    setShippingPrice(deliveryMethod) {
        this.shipping = deliveryMethod.price;
        const basket = this.getCurrentBasketValue();
        basket.deliveryMethodId = deliveryMethod.id;
        basket.shippingPrice = deliveryMethod.price;
        this.calculateTotals();
        this.setBasket(basket);
    }
    getBasket(id) {
        return this.http.get(this.baseUrl + 'basket?id=' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((basket) => {
            this.basketSource.next(basket);
            this.shipping = basket.shippingPrice;
            this.calculateTotals();
        }));
    }
    setBasket(basket) {
        return this.http.post(this.baseUrl + 'basket', basket).subscribe((response) => {
            this.basketSource.next(response);
            this.calculateTotals();
        }, error => {
            console.log(error);
        });
    }
    getCurrentBasketValue() {
        return this.basketSource.value;
    }
    addItemToBasket(item, quantity = 1) {
        const itemToAdd = this.mapProductItemToBasketItem(item, quantity);
        let basket = this.getCurrentBasketValue();
        if (basket === null) {
            basket = this.createBasket();
        }
        basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
        this.setBasket(basket);
    }
    incrementItemQuantity(item) {
        const basket = this.getCurrentBasketValue();
        const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
        basket.items[foundItemIndex].quantity++;
        this.setBasket(basket);
    }
    decrementItemQuantity(item) {
        const basket = this.getCurrentBasketValue();
        const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
        if (basket.items[foundItemIndex].quantity > 1) {
            basket.items[foundItemIndex].quantity--;
            this.setBasket(basket);
        }
        else {
            this.removeItemFromBasket(item);
        }
    }
    removeItemFromBasket(item) {
        const basket = this.getCurrentBasketValue();
        if (basket.items.some(x => x.id === item.id)) {
            basket.items = basket.items.filter(i => i.id !== item.id);
            if (basket.items.length > 0) {
                this.setBasket(basket);
            }
            else {
                this.deleteBasket(basket);
            }
        }
    }
    deleteLocalBasket(id) {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
    }
    deleteBasket(basket) {
        return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
            this.basketSource.next(null);
            this.basketTotalSource.next(null);
            localStorage.removeItem('basket_id');
        }, error => {
            console.log(error);
        });
    }
    calculateTotals() {
        const basket = this.getCurrentBasketValue();
        const shipping = this.shipping;
        const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
        const total = subtotal + shipping;
        this.basketTotalSource.next({ shipping, total, subtotal });
    }
    addOrUpdateItem(items, itemToAdd, quantity) {
        const index = items.findIndex(i => i.id === itemToAdd.id);
        if (index === -1) {
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }
        else {
            items[index].quantity += quantity;
        }
        return items;
    }
    createBasket() {
        const basket = new _shared_models_basket__WEBPACK_IMPORTED_MODULE_3__["Basket"]();
        localStorage.setItem('basket_id', basket.id);
        return basket;
    }
    mapProductItemToBasketItem(item, quantity) {
        return {
            id: item.id,
            productName: item.name,
            price: item.price,
            pictureUrl: item.pictureUrl,
            quantity,
            brand: item.productBrand,
            type: item.productType
        };
    }
}
BasketService.ɵfac = function BasketService_Factory(t) { return new (t || BasketService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"])); };
BasketService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BasketService, factory: BasketService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BasketService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nav-bar/nav-bar.component */ "./src/app/core/nav-bar/nav-bar.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _test_error_test_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./test-error/test-error.component */ "./src/app/core/test-error/test-error.component.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/core/not-found/not-found.component.ts");
/* harmony import */ var _server_error_server_error_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./server-error/server-error.component */ "./src/app/core/server-error/server-error.component.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var xng_breadcrumb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! xng-breadcrumb */ "./node_modules/xng-breadcrumb/__ivy_ngcc__/fesm2015/xng-breadcrumb.js");
/* harmony import */ var _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./section-header/section-header.component */ "./src/app/core/section-header/section-header.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");













class CoreModule {
}
CoreModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoreModule });
CoreModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
            xng_breadcrumb__WEBPACK_IMPORTED_MODULE_8__["BreadcrumbModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrModule"].forRoot({
                positionClass: 'toast-bottom-right',
                preventDuplicates: true
            })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoreModule, { declarations: [_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__["NavBarComponent"], _test_error_test_error_component__WEBPACK_IMPORTED_MODULE_4__["TestErrorComponent"], _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"], _server_error_server_error_component__WEBPACK_IMPORTED_MODULE_6__["ServerErrorComponent"], _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_9__["SectionHeaderComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
        xng_breadcrumb__WEBPACK_IMPORTED_MODULE_8__["BreadcrumbModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrModule"]], exports: [_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__["NavBarComponent"],
        _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_9__["SectionHeaderComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoreModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__["NavBarComponent"], _test_error_test_error_component__WEBPACK_IMPORTED_MODULE_4__["TestErrorComponent"], _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"], _server_error_server_error_component__WEBPACK_IMPORTED_MODULE_6__["ServerErrorComponent"], _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_9__["SectionHeaderComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                    xng_breadcrumb__WEBPACK_IMPORTED_MODULE_8__["BreadcrumbModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                    ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrModule"].forRoot({
                        positionClass: 'toast-bottom-right',
                        preventDuplicates: true
                    })
                ],
                exports: [
                    _nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__["NavBarComponent"],
                    _section_header_section_header_component__WEBPACK_IMPORTED_MODULE_9__["SectionHeaderComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/core/guards/auth.guard.ts":
/*!*******************************************!*\
  !*** ./src/app/core/guards/auth.guard.ts ***!
  \*******************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/account/account.service */ "./src/app/account/account.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class AuthGuard {
    constructor(accountService, router) {
        this.accountService = accountService;
        this.router = router;
    }
    canActivate(next, state) {
        return this.accountService.currentUser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(auth => {
            if (auth) {
                return true;
            }
            this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
        }));
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/interceptors/error.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/app/core/interceptors/error.interceptor.ts ***!
  \********************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");






class ErrorInterceptor {
    constructor(router, toastr) {
        this.router = router;
        this.toastr = toastr;
    }
    intercept(req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => {
            if (error) {
                if (error.status === 400) {
                    if (error.error.errors) {
                        throw error.error;
                    }
                    else {
                        this.toastr.error(error.error.message, error.error.statusCode);
                    }
                }
                if (error.status === 401) {
                    this.toastr.error(error.error.message, error.error.statusCode);
                }
                if (error.status === 404) {
                    this.router.navigateByUrl('/not-found');
                }
                if (error.status === 500) {
                    const navigationExtras = { state: { error: error.error } };
                    this.router.navigateByUrl('/server-error', navigationExtras);
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(error);
        }));
    }
}
ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(t) { return new (t || ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
ErrorInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ErrorInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/interceptors/jwt.interceptor.ts":
/*!******************************************************!*\
  !*** ./src/app/core/interceptors/jwt.interceptor.ts ***!
  \******************************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class JwtInterceptor {
    intercept(req, next) {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
}
JwtInterceptor.ɵfac = function JwtInterceptor_Factory(t) { return new (t || JwtInterceptor)(); };
JwtInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: JwtInterceptor, factory: JwtInterceptor.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](JwtInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();


/***/ }),

/***/ "./src/app/core/interceptors/loading.interceptor.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/interceptors/loading.interceptor.ts ***!
  \**********************************************************/
/*! exports provided: LoadingInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingInterceptor", function() { return LoadingInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/busy.service */ "./src/app/core/services/busy.service.ts");




class LoadingInterceptor {
    constructor(busyService) {
        this.busyService = busyService;
    }
    intercept(req, next) {
        if (req.method === 'POST' && req.url.includes('orders')) {
            return next.handle(req);
        }
        if (req.method === 'DELETE') {
            return next.handle(req);
        }
        if (req.url.includes('emailexists')) {
            return next.handle(req);
        }
        this.busyService.busy();
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
            this.busyService.idle();
        }));
    }
}
LoadingInterceptor.ɵfac = function LoadingInterceptor_Factory(t) { return new (t || LoadingInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_2__["BusyService"])); };
LoadingInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoadingInterceptor, factory: LoadingInterceptor.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadingInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _services_busy_service__WEBPACK_IMPORTED_MODULE_2__["BusyService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/nav-bar/nav-bar.component.ts":
/*!***************************************************!*\
  !*** ./src/app/core/nav-bar/nav-bar.component.ts ***!
  \***************************************************/
/*! exports provided: NavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavBarComponent", function() { return NavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/basket/basket.service */ "./src/app/basket/basket.service.ts");
/* harmony import */ var src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/account/account.service */ "./src/app/account/account.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");







function NavBarComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r502 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r502.basket$).items.length);
} }
function NavBarComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Sign up");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function NavBarComponent_ng_container_16_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r507 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " View Basket ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " View Orders ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavBarComponent_ng_container_16_div_6_Template_a_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r507); const ctx_r506 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r506.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavBarComponent_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, NavBarComponent_ng_container_16_div_6_Template, 11, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r504 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Welcome ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, ctx_r504.currentUser$).displayName, "");
} }
const _c0 = function () { return ["/"]; };
const _c1 = function () { return { exact: true }; };
class NavBarComponent {
    constructor(basketService, accountService) {
        this.basketService = basketService;
        this.accountService = accountService;
    }
    ngOnInit() {
        this.basket$ = this.basketService.basket$;
        this.currentUser$ = this.accountService.currentUser$;
    }
    logout() {
        this.accountService.logout();
    }
}
NavBarComponent.ɵfac = function NavBarComponent_Factory(t) { return new (t || NavBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"])); };
NavBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavBarComponent, selectors: [["app-nav-bar"]], decls: 18, vars: 13, consts: [[1, "d-flex", "flex-column", "flex-md-row", "align-items-center", "justify-content-between", "p-3", "px-md-4", "mb-3", "bg-white", "border-bottom", "shadow-sm", "fixed-top"], ["src", "/assets/images/logo.png", "alt", "logo", "routerLink", "/", 1, "logo", 2, "max-height", "70px"], [1, "my-2", "my-md-0", "mr-md-3", "text-uppercase", 2, "font-size", "larger"], ["routerLinkActive", "active", 1, "p-2", 3, "routerLink", "routerLinkActiveOptions"], ["routerLink", "/shop", "routerLinkActive", "active", 1, "p-2"], ["routerLink", "/test-error", "routerLinkActive", "active", 1, "p-2"], [1, "d-flex", "align-items-center"], ["routerLink", "/basket", 1, "position-relative"], [1, "fa", "fa-shopping-cart", "fa-2x", "mr-5", "text-dark"], ["class", "cart-no", 4, "ngIf"], [4, "ngIf"], [1, "cart-no"], ["routerLink", "/account/login", 1, "btn", "btn-outline-secondary", "mr-2"], ["routerLink", "/account/register", 1, "btn", "btn-outline-secondary", "mr-3"], ["dropdown", "", 1, "dropdown", "ml-3", "mr-5"], ["dropdownToggle", "", 1, "dropdown-toggle", 2, "cursor", "pointer"], ["class", "dropdown-menu dropdown-menu-right", "style", "cursor: pointer;", 4, "dropdownMenu"], [1, "dropdown-menu", "dropdown-menu-right", 2, "cursor", "pointer"], ["routerLink", "/basket", 1, "dropdown-item", "d-flex", "align-items-center", "py-2"], [1, "fa", "fa-shopping-cart", "mr-3"], ["routerLink", "/orders", 1, "dropdown-item", "d-flex", "align-items-center", "py-2"], [1, "fa", "fa-history", "mr-3"], [1, "dropdown-divider"], [1, "dropdown-item", "d-flex", "align-items-center", "py-2", 3, "click"], [1, "fa", "fa-sign-out", "mr-3"]], template: function NavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Shop");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Errors");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, NavBarComponent_div_12_Template, 3, 3, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, NavBarComponent_ng_container_14_Template, 5, 0, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, NavBarComponent_ng_container_16_Template, 7, 3, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0))("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 5, ctx.basket$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 7, ctx.currentUser$) === null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](17, 9, ctx.currentUser$));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__["BsDropdownDirective"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__["BsDropdownToggleDirective"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__["BsDropdownMenuDirective"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".cart-no[_ngcontent-%COMP%] {\n  position: absolute;\n  min-height: 25px;\n  min-width: 25px;\n  border-radius: 50%;\n  font-size: 1em;\n  background: blue;\n  color: white;\n  text-align: center;\n  top: -12px;\n  right: 32px;\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #343a40;\n}\n\na.active[_ngcontent-%COMP%] {\n  color: orange;\n}\n\n.logo[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.logo[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9uYXYtYmFyL0M6XFxVc2Vyc1xceXNoY2hlaGxpdWtcXHNvdXJjZVxccHJhY2FEeXBsb21vd2FYXFxGb29kLUFwcF9XZWJfXFxjbGllbnQvc3JjXFxhcHBcXGNvcmVcXG5hdi1iYXJcXG5hdi1iYXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvcmUvbmF2LWJhci9uYXYtYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxxQkFBQTtFQUNBLGNBQUE7QUNDSjs7QURDSTtFQUNJLGFBQUE7QUNDUjs7QURHQTtFQUNJLGVBQUE7QUNBSjs7QURFSTtFQUNJLGFBQUE7QUNBUiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvbmF2LWJhci9uYXYtYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcnQtbm8ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtaW4taGVpZ2h0OiAyNXB4O1xuICAgIG1pbi13aWR0aDogMjVweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZm9udC1zaXplOiAxZW07XG4gICAgYmFja2dyb3VuZDogYmx1ZTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRvcDogLTEycHg7XG4gICAgcmlnaHQ6IDMycHg7XG59XG5cbmEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogIzM0M2E0MDtcblxuICAgICYuYWN0aXZlIHtcbiAgICAgICAgY29sb3I6IG9yYW5nZTtcbiAgICB9XG59XG5cbi5sb2dvIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG59IiwiLmNhcnQtbm8ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1pbi1oZWlnaHQ6IDI1cHg7XG4gIG1pbi13aWR0aDogMjVweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDFlbTtcbiAgYmFja2dyb3VuZDogYmx1ZTtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRvcDogLTEycHg7XG4gIHJpZ2h0OiAzMnB4O1xufVxuXG5hIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogIzM0M2E0MDtcbn1cbmEuYWN0aXZlIHtcbiAgY29sb3I6IG9yYW5nZTtcbn1cblxuLmxvZ28ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ubG9nbzpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav-bar',
                templateUrl: './nav-bar.component.html',
                styleUrls: ['./nav-bar.component.scss']
            }]
    }], function () { return [{ type: src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"] }, { type: src_app_account_account_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/not-found/not-found.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/core/not-found/not-found.component.ts ***!
  \*******************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NotFoundComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(); };
NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotFoundComponent, selectors: [["app-not-found"]], decls: 3, vars: 0, consts: [[1, "container", "mt-5"]], template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Not Found");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotFoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-not-found',
                templateUrl: './not-found.component.html',
                styleUrls: ['./not-found.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/core/section-header/section-header.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/core/section-header/section-header.component.ts ***!
  \*****************************************************************/
/*! exports provided: SectionHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionHeaderComponent", function() { return SectionHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var xng_breadcrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xng-breadcrumb */ "./node_modules/xng-breadcrumb/__ivy_ngcc__/fesm2015/xng-breadcrumb.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function SectionHeaderComponent_ng_container_0_section_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "xng-breadcrumb");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const breadcrumbs_r509 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 1, breadcrumbs_r509.length > 0 && breadcrumbs_r509[breadcrumbs_r509.length - 1].label));
} }
function SectionHeaderComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SectionHeaderComponent_ng_container_0_section_1_Template, 9, 3, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const breadcrumbs_r509 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", breadcrumbs_r509.length > 0 && breadcrumbs_r509[breadcrumbs_r509.length - 1].label !== "Home");
} }
class SectionHeaderComponent {
    constructor(bcService) {
        this.bcService = bcService;
    }
    ngOnInit() {
        this.breadcrumb$ = this.bcService.breadcrumbs$;
    }
}
SectionHeaderComponent.ɵfac = function SectionHeaderComponent_Factory(t) { return new (t || SectionHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](xng_breadcrumb__WEBPACK_IMPORTED_MODULE_1__["BreadcrumbService"])); };
SectionHeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SectionHeaderComponent, selectors: [["app-section-header"]], decls: 2, vars: 3, consts: [[4, "ngIf"], ["class", "py-5", "style", "margin-top: 105px; background-color: #f5f5f5;", 4, "ngIf"], [1, "py-5", 2, "margin-top", "105px", "background-color", "#f5f5f5"], [1, "container"], [1, "row", "d-flex", "align-items-center"], [1, "col-9"], [1, "col-3"]], template: function SectionHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SectionHeaderComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.breadcrumb$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], xng_breadcrumb__WEBPACK_IMPORTED_MODULE_1__["BreadcrumbComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["TitleCasePipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvc2VjdGlvbi1oZWFkZXIvc2VjdGlvbi1oZWFkZXIuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SectionHeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-section-header',
                templateUrl: './section-header.component.html',
                styleUrls: ['./section-header.component.scss']
            }]
    }], function () { return [{ type: xng_breadcrumb__WEBPACK_IMPORTED_MODULE_1__["BreadcrumbService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/server-error/server-error.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/core/server-error/server-error.component.ts ***!
  \*************************************************************/
/*! exports provided: ServerErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerErrorComponent", function() { return ServerErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function ServerErrorComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Note: if you are seeing this then Angular is probably not responsible");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "What to do next?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ol");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Open chrome dev tools");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Inspect the network tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Check the failing request");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Examine this request URL - make sure this is correct");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Reproduce the error in postman - if we the same reponse in Postman, then the issue is NOT with Angular");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Following is the stack trace - this is where your investigation should start!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "code", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r414 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Error: ", ctx_r414.error.message, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r414.error.details);
} }
class ServerErrorComponent {
    constructor(router) {
        this.router = router;
        const navigation = this.router.getCurrentNavigation();
        this.error = navigation && navigation.extras && navigation.extras.state && navigation.extras.state.error;
    }
    ngOnInit() {
    }
}
ServerErrorComponent.ɵfac = function ServerErrorComponent_Factory(t) { return new (t || ServerErrorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
ServerErrorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ServerErrorComponent, selectors: [["app-server-error"]], decls: 4, vars: 1, consts: [[1, "container", "mt-5"], [4, "ngIf"], [1, "text-danger"], [1, "font-weight-bold"], [1, "mt-5", 2, "background-color", "whitesmoke"]], template: function ServerErrorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Internal Server Error - refreshing the page will make the exception disappear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ServerErrorComponent_ng_container_3_Template, 22, 2, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.error);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvc2VydmVyLWVycm9yL3NlcnZlci1lcnJvci5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServerErrorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-server-error',
                templateUrl: './server-error.component.html',
                styleUrls: ['./server-error.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/services/busy.service.ts":
/*!***********************************************!*\
  !*** ./src/app/core/services/busy.service.ts ***!
  \***********************************************/
/*! exports provided: BusyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusyService", function() { return BusyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/__ivy_ngcc__/fesm2015/ngx-spinner.js");



class BusyService {
    constructor(spinnerService) {
        this.spinnerService = spinnerService;
        this.busyRequestCount = 0;
    }
    busy() {
        this.busyRequestCount++;
        this.spinnerService.show(undefined, {
            type: 'timer',
            bdColor: 'rgba(255,255,255,0.7)',
            color: '#333333'
        });
    }
    idle() {
        this.busyRequestCount--;
        if (this.busyRequestCount <= 0) {
            this.busyRequestCount = 0;
            this.spinnerService.hide();
        }
    }
}
BusyService.ɵfac = function BusyService_Factory(t) { return new (t || BusyService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"])); };
BusyService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BusyService, factory: BusyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BusyService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/test-error/test-error.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/test-error/test-error.component.ts ***!
  \*********************************************************/
/*! exports provided: TestErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestErrorComponent", function() { return TestErrorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function TestErrorComponent_div_9_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const error_r413 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](error_r413);
} }
function TestErrorComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TestErrorComponent_div_9_li_2_Template, 2, 1, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r411 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r411.validationErrors);
} }
class TestErrorComponent {
    constructor(http) {
        this.http = http;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
    }
    ngOnInit() {
    }
    get404Error() {
        this.http.get(this.baseUrl + 'products/42').subscribe(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
    get500Error() {
        this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
    get400Error() {
        this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
    get400ValidationError() {
        this.http.get(this.baseUrl + 'products/fortytwo').subscribe(response => {
            console.log(response);
        }, error => {
            console.log(error);
            this.validationErrors = error.errors;
        });
    }
}
TestErrorComponent.ɵfac = function TestErrorComponent_Factory(t) { return new (t || TestErrorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
TestErrorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestErrorComponent, selectors: [["app-test-error"]], decls: 10, vars: 1, consts: [[1, "container", "mt-5"], [1, "btn", "btn-outline-primary", "mr-3", 3, "click"], ["class", "row mt-5", 4, "ngIf"], [1, "row", "mt-5"], [1, "text-danger"], [4, "ngFor", "ngForOf"]], template: function TestErrorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestErrorComponent_Template_button_click_1_listener($event) { return ctx.get500Error(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Test 500 Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestErrorComponent_Template_button_click_3_listener($event) { return ctx.get404Error(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Test 404 Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestErrorComponent_Template_button_click_5_listener($event) { return ctx.get400Error(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Test 400 Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TestErrorComponent_Template_button_click_7_listener($event) { return ctx.get400ValidationError(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Test 400 Validation Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, TestErrorComponent_div_9_Template, 3, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.validationErrors);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvdGVzdC1lcnJvci90ZXN0LWVycm9yLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestErrorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-test-error',
                templateUrl: './test-error.component.html',
                styleUrls: ['./test-error.component.scss']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");



class HomeComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 11, vars: 0, consts: [["src", "assets/images/hero1.jpg", "alt", "first slide", 2, "display", "block", "width", "100%"], ["src", "assets/images/hero2.jpg", "alt", "first slide", 2, "display", "block", "width", "100%"], ["src", "assets/images/hero3.jpg", "alt", "first slide", 2, "display", "block", "width", "100%"], [1, "featured"], [1, "d-flex", "justify-content-center", "pt-4"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "carousel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Welcome to the Shop!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["CarouselComponent"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["SlideComponent"]], styles: [".featured[_ngcontent-%COMP%] {\n  height: 250px;\n}\n\nimg[_ngcontent-%COMP%] {\n  -o-object-fit: cover;\n     object-fit: cover;\n  height: 600px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcVXNlcnNcXHlzaGNoZWhsaXVrXFxzb3VyY2VcXHByYWNhRHlwbG9tb3dhWFxcRm9vZC1BcHBfV2ViX1xcY2xpZW50L3NyY1xcYXBwXFxob21lXFxob21lLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0FDQ0o7O0FERUE7RUFDSSxvQkFBQTtLQUFBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mZWF0dXJlZCB7XG4gICAgaGVpZ2h0OiAyNTBweDtcbn1cblxuaW1nIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBoZWlnaHQ6IDYwMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xufSIsIi5mZWF0dXJlZCB7XG4gIGhlaWdodDogMjUwcHg7XG59XG5cbmltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBoZWlnaHQ6IDYwMHB4O1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");





class HomeModule {
}
HomeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: HomeModule });
HomeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function HomeModule_Factory(t) { return new (t || HomeModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](HomeModule, { declarations: [_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]], exports: [_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
                ],
                exports: [_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/shared/components/basket-summary/basket-summary.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/basket-summary/basket-summary.component.ts ***!
  \******************************************************************************/
/*! exports provided: BasketSummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketSummaryComponent", function() { return BasketSummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




function BasketSummaryComponent_ng_container_0_th_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function BasketSummaryComponent_ng_container_0_tr_19_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r456 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Type: ", item_r456.type, " ");
} }
function BasketSummaryComponent_ng_container_0_tr_19_i_15_Template(rf, ctx) { if (rf & 1) {
    const _r464 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BasketSummaryComponent_ng_container_0_tr_19_i_15_Template_i_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r464); const item_r456 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r462 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r462.decrementItemQuantity(item_r456); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function BasketSummaryComponent_ng_container_0_tr_19_i_18_Template(rf, ctx) { if (rf & 1) {
    const _r467 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BasketSummaryComponent_ng_container_0_tr_19_i_18_Template_i_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r467); const item_r456 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r465 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r465.incrementItemQuantity(item_r456); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function BasketSummaryComponent_ng_container_0_tr_19_i_25_Template(rf, ctx) { if (rf & 1) {
    const _r470 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BasketSummaryComponent_ng_container_0_tr_19_i_25_Template_i_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r470); const item_r456 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r468 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r468.removeBasketItem(item_r456); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function BasketSummaryComponent_ng_container_0_tr_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "th", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h5", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, BasketSummaryComponent_ng_container_0_tr_19_span_8_Template, 2, 1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, BasketSummaryComponent_ng_container_0_tr_19_i_15_Template, 1, 0, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, BasketSummaryComponent_ng_container_0_tr_19_i_18_Template, 1, 0, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](22, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, BasketSummaryComponent_ng_container_0_tr_19_i_25_Template, 1, 0, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r456 = ctx.$implicit;
    const ctx_r455 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", item_r456.pictureUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", item_r456.productName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/shop/", item_r456.id || item_r456.productId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r456.productName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r456.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](12, 13, item_r456.price));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("justify-content-center", !ctx_r455.isBasket);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r455.isBasket);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r456.quantity, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r455.isBasket);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](22, 15, item_r456.price * item_r456.quantity));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r455.isBasket);
} }
function BasketSummaryComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "table", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "thead", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Product");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Price");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Quantity");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, BasketSummaryComponent_ng_container_0_th_17_Template, 3, 0, "th", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, BasketSummaryComponent_ng_container_0_tr_19_Template, 26, 17, "tr", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r453 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("thead-light", ctx_r453.isBasket || ctx_r453.isOrder);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r453.isBasket);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r453.items);
} }
class BasketSummaryComponent {
    constructor() {
        this.decrement = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.increment = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isBasket = true;
        this.items = [];
        this.isOrder = false;
    }
    ngOnInit() {
    }
    decrementItemQuantity(item) {
        this.decrement.emit(item);
    }
    incrementItemQuantity(item) {
        this.increment.emit(item);
    }
    removeBasketItem(item) {
        this.remove.emit(item);
    }
}
BasketSummaryComponent.ɵfac = function BasketSummaryComponent_Factory(t) { return new (t || BasketSummaryComponent)(); };
BasketSummaryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BasketSummaryComponent, selectors: [["app-basket-summary"]], inputs: { isBasket: "isBasket", items: "items", isOrder: "isOrder" }, outputs: { decrement: "decrement", increment: "increment", remove: "remove" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "table-responsive"], [1, "table", "table-borderless"], [1, "border-0", "py-2"], ["scope", "col"], [1, "p-2", "px-3", "text-uppercase"], [1, "py-2", "text-uppercase"], ["scope", "col", "class", "border-0", 4, "ngIf"], ["class", "border-0", 4, "ngFor", "ngForOf"], ["scope", "col", 1, "border-0"], [1, "border-0"], ["scope", "row"], [1, "p-0"], [1, "img-fluid", 2, "max-height", "50px", 3, "src", "alt"], [1, "ml-3", "d-inline-block", "align-middle"], [1, "mb-0"], [1, "text-dark", 3, "routerLink"], ["class", "text-muted font-weight-normal font-italic d-block", 4, "ngIf"], [1, "align-middle"], [1, "d-flex", "align-items-center"], ["class", "fa fa-minus-circle text-warning mr-2", "style", "cursor: pointer; font-size: 2em;", 3, "click", 4, "ngIf"], [1, "font-weight-bold", 2, "font-size", "1.5em"], ["class", "fa fa-plus-circle text-warning mx-2", "style", "cursor: pointer; font-size: 2em;", 3, "click", 4, "ngIf"], [1, "align-middle", "text-center"], [1, "text-danger"], ["class", "fa fa-trash", "style", "font-size: 2em; cursor: pointer;", 3, "click", 4, "ngIf"], [1, "text-muted", "font-weight-normal", "font-italic", "d-block"], [1, "fa", "fa-minus-circle", "text-warning", "mr-2", 2, "cursor", "pointer", "font-size", "2em", 3, "click"], [1, "fa", "fa-plus-circle", "text-warning", "mx-2", 2, "cursor", "pointer", "font-size", "2em", 3, "click"], [1, "fa", "fa-trash", 2, "font-size", "2em", "cursor", "pointer", 3, "click"]], template: function BasketSummaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BasketSummaryComponent_ng_container_0_Template, 20, 4, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.items.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CurrencyPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2Jhc2tldC1zdW1tYXJ5L2Jhc2tldC1zdW1tYXJ5LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BasketSummaryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-basket-summary',
                templateUrl: './basket-summary.component.html',
                styleUrls: ['./basket-summary.component.scss']
            }]
    }], function () { return []; }, { decrement: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], increment: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], remove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], isBasket: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], items: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], isOrder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/components/order-totals/order-totals.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/order-totals/order-totals.component.ts ***!
  \**************************************************************************/
/*! exports provided: OrderTotalsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTotalsComponent", function() { return OrderTotalsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



class OrderTotalsComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
OrderTotalsComponent.ɵfac = function OrderTotalsComponent_Factory(t) { return new (t || OrderTotalsComponent)(); };
OrderTotalsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OrderTotalsComponent, selectors: [["app-order-totals"]], inputs: { shippingPrice: "shippingPrice", subtotal: "subtotal", total: "total" }, decls: 24, vars: 9, consts: [[1, "bg-light", "px-4", "text-uppercase", "font-weight-bold", 2, "padding", "1.20em"], [1, "p-4"], [1, "font-italic", "mb-4"], [1, "list-unstyled", "mb-4"], [1, "d-flex", "justify-content-between", "py-3", "border-bottom"], [1, "text-muted"]], template: function OrderTotalsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Order Summary\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Shipping costs will be added depending on choices made during checkout");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "strong", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Order subtotal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "strong", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Shipping and handling");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "strong", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Total");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](11, 3, ctx.subtotal));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](17, 5, ctx.shippingPrice));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](23, 7, ctx.total));
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CurrencyPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL29yZGVyLXRvdGFscy9vcmRlci10b3RhbHMuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrderTotalsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-order-totals',
                templateUrl: './order-totals.component.html',
                styleUrls: ['./order-totals.component.scss']
            }]
    }], function () { return []; }, { shippingPrice: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], subtotal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], total: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/components/pager/pager.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/components/pager/pager.component.ts ***!
  \************************************************************/
/*! exports provided: PagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagerComponent", function() { return PagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");




class PagerComponent {
    constructor() {
        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    onPagerChange(event) {
        this.pageChanged.emit(event.page);
    }
}
PagerComponent.ɵfac = function PagerComponent_Factory(t) { return new (t || PagerComponent)(); };
PagerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PagerComponent, selectors: [["app-pager"]], inputs: { totalCount: "totalCount", pageSize: "pageSize", pageNumber: "pageNumber" }, outputs: { pageChanged: "pageChanged" }, decls: 1, vars: 4, consts: [["previousText", "\u2039", "nextText", "\u203A", "firstText", "\u00AB", "lastText", "\u00BB", 3, "boundaryLinks", "totalItems", "ngModel", "itemsPerPage", "pageChanged"]], template: function PagerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pagination", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChanged", function PagerComponent_Template_pagination_pageChanged_0_listener($event) { return ctx.onPagerChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("boundaryLinks", true)("totalItems", ctx.totalCount)("ngModel", ctx.pageNumber)("itemsPerPage", ctx.pageSize);
    } }, directives: [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["PaginationComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3BhZ2VyL3BhZ2VyLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pager',
                templateUrl: './pager.component.html',
                styleUrls: ['./pager.component.scss']
            }]
    }], function () { return []; }, { totalCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageNumber: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/components/paging-header/paging-header.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/paging-header/paging-header.component.ts ***!
  \****************************************************************************/
/*! exports provided: PagingHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagingHeaderComponent", function() { return PagingHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



function PagingHeaderComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Showing ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " of ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r439 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", (ctx_r439.pageNumber - 1) * ctx_r439.pageSize + 1, " - ", ctx_r439.pageNumber * ctx_r439.pageSize > ctx_r439.totalCount ? ctx_r439.totalCount : ctx_r439.pageNumber * ctx_r439.pageSize, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r439.totalCount);
} }
function PagingHeaderComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " There are ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " results for this filter ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class PagingHeaderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
PagingHeaderComponent.ɵfac = function PagingHeaderComponent_Factory(t) { return new (t || PagingHeaderComponent)(); };
PagingHeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PagingHeaderComponent, selectors: [["app-paging-header"]], inputs: { pageNumber: "pageNumber", pageSize: "pageSize", totalCount: "totalCount" }, decls: 3, vars: 2, consts: [[4, "ngIf"]], template: function PagingHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PagingHeaderComponent_span_1_Template, 8, 3, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PagingHeaderComponent_span_2_Template, 5, 0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.totalCount && ctx.totalCount > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.totalCount === 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3BhZ2luZy1oZWFkZXIvcGFnaW5nLWhlYWRlci5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagingHeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-paging-header',
                templateUrl: './paging-header.component.html',
                styleUrls: ['./paging-header.component.scss']
            }]
    }], function () { return []; }, { pageNumber: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], totalCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/components/stepper/stepper.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/stepper/stepper.component.ts ***!
  \****************************************************************/
/*! exports provided: StepperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StepperComponent", function() { return StepperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/stepper.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function StepperComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r452 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StepperComponent_li_2_Template_button_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r452); const i_r450 = ctx.index; const ctx_r451 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r451.onClick(i_r450); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const step_r449 = ctx.$implicit;
    const i_r450 = ctx.index;
    const ctx_r448 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", ctx_r448.selectedIndex === i_r450);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", step_r449.label, " ");
} }
class StepperComponent extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__["CdkStepper"] {
    ngOnInit() {
        this.linear = this.linearModeSelected;
    }
    onClick(index) {
        this.selectedIndex = index;
    }
}
StepperComponent.ɵfac = function StepperComponent_Factory(t) { return ɵStepperComponent_BaseFactory(t || StepperComponent); };
StepperComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StepperComponent, selectors: [["app-stepper"]], inputs: { linearModeSelected: "linearModeSelected" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{ provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__["CdkStepper"], useExisting: StepperComponent }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 2, consts: [[1, "container"], [1, "nav", "nav-pills", "nav-justified"], ["class", "nav-item", 4, "ngFor", "ngForOf"], [3, "ngTemplateOutlet"], [1, "nav-item"], [1, "nav-link", "text-uppercase", "font-weight-bold", "btn-block", 2, "padding", "1.20em", 3, "disabled", "click"]], template: function StepperComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, StepperComponent_li_2_Template, 3, 4, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](4, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.steps);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.selected.content);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgTemplateOutlet"]], styles: ["button.nav-link[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  border-radius: 0;\n  border: none;\n}\nbutton.nav-link[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\nbutton.nav-link.active[_ngcontent-%COMP%]:hover {\n  color: white;\n}\nbutton.nav-link[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:active {\n  outline: none;\n}\nbutton.nav-link.active[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\nbutton.nav-link[_ngcontent-%COMP%]:disabled:not(.active) {\n  color: #333;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc3RlcHBlci9DOlxcVXNlcnNcXHlzaGNoZWhsaXVrXFxzb3VyY2VcXHByYWNhRHlwbG9tb3dhWFxcRm9vZC1BcHBfV2ViX1xcY2xpZW50L3NyY1xcYXBwXFxzaGFyZWRcXGNvbXBvbmVudHNcXHN0ZXBwZXJcXHN0ZXBwZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3N0ZXBwZXIvc3RlcHBlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FDQ0o7QURDSTtFQUNJLGFBQUE7QUNDUjtBRENJO0VBQ0ksWUFBQTtBQ0NSO0FEQ0k7RUFDSSxhQUFBO0FDQ1I7QURDSTtFQUNJLGFBQUE7QUNDUjtBRENJO0VBQ0ksV0FBQTtBQ0NSIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uLm5hdi1saW5rIHtcbiAgICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYm9yZGVyOiBub25lO1xuXG4gICAgJjpmb2N1cyB7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICAgICYuYWN0aXZlOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICAmIDphY3RpdmUge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cbiAgICAmLmFjdGl2ZTpmb2N1cyB7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICAgICY6ZGlzYWJsZWQ6bm90KC5hY3RpdmUpIHtcbiAgICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxufSIsImJ1dHRvbi5uYXYtbGluayB7XG4gIGJhY2tncm91bmQ6ICNlOWVjZWY7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGJvcmRlcjogbm9uZTtcbn1cbmJ1dHRvbi5uYXYtbGluazpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5idXR0b24ubmF2LWxpbmsuYWN0aXZlOmhvdmVyIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuYnV0dG9uLm5hdi1saW5rIDphY3RpdmUge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uLm5hdi1saW5rLmFjdGl2ZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5idXR0b24ubmF2LWxpbms6ZGlzYWJsZWQ6bm90KC5hY3RpdmUpIHtcbiAgY29sb3I6ICMzMzM7XG59Il19 */"] });
const ɵStepperComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](StepperComponent);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StepperComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-stepper',
                templateUrl: './stepper.component.html',
                styleUrls: ['./stepper.component.scss'],
                providers: [{ provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__["CdkStepper"], useExisting: StepperComponent }]
            }]
    }], null, { linearModeSelected: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/components/text-input/text-input.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/text-input/text-input.component.ts ***!
  \**********************************************************************/
/*! exports provided: TextInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextInputComponent", function() { return TextInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




const _c0 = ["input"];
function TextInputComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 7);
} }
function TextInputComponent_div_6_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r445 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r445.label, " is required");
} }
function TextInputComponent_div_6_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid email address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TextInputComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TextInputComponent_div_6_span_1_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TextInputComponent_div_6_span_2_Template, 2, 0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r443 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r443.controlDir.control.errors == null ? null : ctx_r443.controlDir.control.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r443.controlDir.control.errors == null ? null : ctx_r443.controlDir.control.errors.pattern);
} }
function TextInputComponent_div_7_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Email address is in use");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TextInputComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TextInputComponent_div_7_span_1_Template, 2, 0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r444 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r444.controlDir.control.errors == null ? null : ctx_r444.controlDir.control.errors.emailExists);
} }
class TextInputComponent {
    constructor(controlDir) {
        this.controlDir = controlDir;
        this.type = 'text';
        this.controlDir.valueAccessor = this;
    }
    ngOnInit() {
        const control = this.controlDir.control;
        const validators = control.validator ? [control.validator] : [];
        const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];
        control.setValidators(validators);
        control.setAsyncValidators(asyncValidators);
        control.updateValueAndValidity();
    }
    onChange(event) { }
    onTouched() { }
    writeValue(obj) {
        this.input.nativeElement.value = obj || '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
TextInputComponent.ɵfac = function TextInputComponent_Factory(t) { return new (t || TextInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"], 2)); };
TextInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TextInputComponent, selectors: [["app-text-input"]], viewQuery: function TextInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, inputs: { type: "type", label: "label" }, decls: 8, vars: 9, consts: [[1, "form-label-group"], [1, "form-control", 3, "ngClass", "type", "id", "placeholder", "input", "blur"], ["input", ""], ["class", "fa fa-spinner fa-spin loader", 4, "ngIf"], [3, "for"], ["class", "invalid-feedback", 4, "ngIf"], ["class", "invalid-feedback d-block", 4, "ngIf"], [1, "fa", "fa-spinner", "fa-spin", "loader"], [1, "invalid-feedback"], [4, "ngIf"], [1, "invalid-feedback", "d-block"]], template: function TextInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function TextInputComponent_Template_input_input_1_listener($event) { return ctx.onChange($event.target.value); })("blur", function TextInputComponent_Template_input_blur_1_listener($event) { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TextInputComponent_div_3_Template, 1, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TextInputComponent_div_6_Template, 3, 2, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TextInputComponent_div_7_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.controlDir && ctx.controlDir.control && ctx.controlDir.control.touched ? !ctx.controlDir.control.valid ? "is-invalid" : "is-valid" : null)("type", ctx.type);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controlDir && ctx.controlDir.control && ctx.controlDir.control.status === "PENDING");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("for", ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controlDir && ctx.controlDir.control && !ctx.controlDir.control.valid && ctx.controlDir.control.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.controlDir && ctx.controlDir.control && !ctx.controlDir.control.valid && ctx.controlDir.control.dirty);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: [".form-label-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 1rem;\n}\n\n.form-label-group[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%], .form-label-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  height: 3.125rem;\n  padding: 0.75rem;\n}\n\n.form-label-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  width: 100%;\n  margin-bottom: 0;\n  \n  line-height: 1.5;\n  color: #495057;\n  pointer-events: none;\n  cursor: text;\n  \n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  -webkit-transition: all 0.1s ease-in-out;\n  transition: all 0.1s ease-in-out;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-input-placeholder {\n  color: transparent;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder {\n  color: transparent;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder {\n  color: transparent;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: transparent;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown) {\n  padding-top: 1.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown)    ~ label[_ngcontent-%COMP%] {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 12px;\n  color: #777;\n}\n\n\n\n@supports (-ms-ime-align: auto) {\n  .form-label-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder {\n    color: #777;\n  }\n}\n\n\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .form-label-group[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .form-label-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder {\n    color: #777;\n  }\n}\n\n.loader[_ngcontent-%COMP%] {\n  position: absolute;\n  width: auto;\n  top: 15px;\n  right: 10px;\n  margin-top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdGV4dC1pbnB1dC9DOlxcVXNlcnNcXHlzaGNoZWhsaXVrXFxzb3VyY2VcXHByYWNhRHlwbG9tb3dhWFxcRm9vZC1BcHBfV2ViX1xcY2xpZW50L3NyY1xcYXBwXFxzaGFyZWRcXGNvbXBvbmVudHNcXHRleHQtaW5wdXRcXHRleHQtaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3RleHQtaW5wdXQvdGV4dC1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFRTs7RUFFRSxnQkFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FERUU7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUFrQixzQ0FBQTtFQUNsQixnQkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFBYyxvQ0FBQTtFQUNkLDZCQUFBO0VBQ0Esc0JBQUE7RUFDQSx3Q0FBQTtFQUFBLGdDQUFBO0FDR0o7O0FEQUU7RUFDRSxrQkFBQTtBQ0dKOztBRElFO0VBQ0Usa0JBQUE7QUNHSjs7QURBRTtFQUNFLGtCQUFBO0FDR0o7O0FEQUU7RUFDRSxrQkFBQTtBQ0dKOztBREFFO0VBQ0Usb0JBQUE7RUFDQSx1QkFBQTtBQ0dKOztBREFFO0VBQ0Usb0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FDR0o7O0FEQUU7b0RBQUE7O0FBRUE7RUFDRTtJQUNFLGFBQUE7RUNHSjs7RURERTtJQUNFLFdBQUE7RUNJSjtBQUNGOztBRERFO29EQUFBOztBQUVBO0VBQ0U7SUFDRSxhQUFBO0VDR0o7O0VEREU7SUFDRSxXQUFBO0VDSUo7QUFDRjs7QURBQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQ0VGIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvdGV4dC1pbnB1dC90ZXh0LWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tbGFiZWwtZ3JvdXAge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG4gIFxuICAuZm9ybS1sYWJlbC1ncm91cCA+IGlucHV0LFxuICAuZm9ybS1sYWJlbC1ncm91cCA+IGxhYmVsIHtcbiAgICBoZWlnaHQ6IDMuMTI1cmVtO1xuICAgIHBhZGRpbmc6IC43NXJlbTtcbiAgfVxuICBcbiAgLmZvcm0tbGFiZWwtZ3JvdXAgPiBsYWJlbCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDA7IC8qIE92ZXJyaWRlIGRlZmF1bHQgYDxsYWJlbD5gIG1hcmdpbiAqL1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgY29sb3I6ICM0OTUwNTc7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgY3Vyc29yOiB0ZXh0OyAvKiBNYXRjaCB0aGUgaW5wdXQgdW5kZXIgdGhlIGxhYmVsICovXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xuICAgIHRyYW5zaXRpb246IGFsbCAuMXMgZWFzZS1pbi1vdXQ7XG4gIH1cbiAgXG4gIC5mb3JtLWxhYmVsLWdyb3VwIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgXG4gIC5mb3JtLWxhYmVsLWdyb3VwIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG4gIFxuICAuZm9ybS1sYWJlbC1ncm91cCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgXG4gIC5mb3JtLWxhYmVsLWdyb3VwIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgXG4gIC5mb3JtLWxhYmVsLWdyb3VwIGlucHV0OjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG4gIFxuICAuZm9ybS1sYWJlbC1ncm91cCBpbnB1dDpub3QoOnBsYWNlaG9sZGVyLXNob3duKSB7XG4gICAgcGFkZGluZy10b3A6IDEuMjVyZW07XG4gICAgcGFkZGluZy1ib3R0b206IC4yNXJlbTtcbiAgfVxuICBcbiAgLmZvcm0tbGFiZWwtZ3JvdXAgaW5wdXQ6bm90KDpwbGFjZWhvbGRlci1zaG93bikgfiBsYWJlbCB7XG4gICAgcGFkZGluZy10b3A6IC4yNXJlbTtcbiAgICBwYWRkaW5nLWJvdHRvbTogLjI1cmVtO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzc3NztcbiAgfVxuICBcbiAgLyogRmFsbGJhY2sgZm9yIEVkZ2VcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgQHN1cHBvcnRzICgtbXMtaW1lLWFsaWduOiBhdXRvKSB7XG4gICAgLmZvcm0tbGFiZWwtZ3JvdXAgPiBsYWJlbCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAuZm9ybS1sYWJlbC1ncm91cCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgIGNvbG9yOiAjNzc3O1xuICAgIH1cbiAgfVxuICBcbiAgLyogRmFsbGJhY2sgZm9yIElFXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIEBtZWRpYSBhbGwgYW5kICgtbXMtaGlnaC1jb250cmFzdDogbm9uZSksICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gICAgLmZvcm0tbGFiZWwtZ3JvdXAgPiBsYWJlbCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAuZm9ybS1sYWJlbC1ncm91cCBpbnB1dDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6ICM3Nzc7XG4gICAgfVxuICB9XG4gIFxuXG4ubG9hZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogYXV0bztcbiAgdG9wOiAxNXB4O1xuICByaWdodDogMTBweDtcbiAgbWFyZ2luLXRvcDogMDtcbn0iLCIuZm9ybS1sYWJlbC1ncm91cCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmZvcm0tbGFiZWwtZ3JvdXAgPiBpbnB1dCxcbi5mb3JtLWxhYmVsLWdyb3VwID4gbGFiZWwge1xuICBoZWlnaHQ6IDMuMTI1cmVtO1xuICBwYWRkaW5nOiAwLjc1cmVtO1xufVxuXG4uZm9ybS1sYWJlbC1ncm91cCA+IGxhYmVsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgLyogT3ZlcnJpZGUgZGVmYXVsdCBgPGxhYmVsPmAgbWFyZ2luICovXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGNvbG9yOiAjNDk1MDU3O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgY3Vyc29yOiB0ZXh0O1xuICAvKiBNYXRjaCB0aGUgaW5wdXQgdW5kZXIgdGhlIGxhYmVsICovXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4xcyBlYXNlLWluLW91dDtcbn1cblxuLmZvcm0tbGFiZWwtZ3JvdXAgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5mb3JtLWxhYmVsLWdyb3VwIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmZvcm0tbGFiZWwtZ3JvdXAgaW5wdXQ6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmZvcm0tbGFiZWwtZ3JvdXAgaW5wdXQ6Oi1tb3otcGxhY2Vob2xkZXIge1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5mb3JtLWxhYmVsLWdyb3VwIGlucHV0OjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmZvcm0tbGFiZWwtZ3JvdXAgaW5wdXQ6bm90KDpwbGFjZWhvbGRlci1zaG93bikge1xuICBwYWRkaW5nLXRvcDogMS4yNXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDAuMjVyZW07XG59XG5cbi5mb3JtLWxhYmVsLWdyb3VwIGlucHV0Om5vdCg6cGxhY2Vob2xkZXItc2hvd24pIH4gbGFiZWwge1xuICBwYWRkaW5nLXRvcDogMC4yNXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDAuMjVyZW07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICM3Nzc7XG59XG5cbi8qIEZhbGxiYWNrIGZvciBFZGdlXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuQHN1cHBvcnRzICgtbXMtaW1lLWFsaWduOiBhdXRvKSB7XG4gIC5mb3JtLWxhYmVsLWdyb3VwID4gbGFiZWwge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAuZm9ybS1sYWJlbC1ncm91cCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogIzc3NztcbiAgfVxufVxuLyogRmFsbGJhY2sgZm9yIElFXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcbiAgLmZvcm0tbGFiZWwtZ3JvdXAgPiBsYWJlbCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC5mb3JtLWxhYmVsLWdyb3VwIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICM3Nzc7XG4gIH1cbn1cbi5sb2FkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiBhdXRvO1xuICB0b3A6IDE1cHg7XG4gIHJpZ2h0OiAxMHB4O1xuICBtYXJnaW4tdG9wOiAwO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TextInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-text-input',
                templateUrl: './text-input.component.html',
                styleUrls: ['./text-input.component.scss']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }]; }, { input: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['input', { static: true }]
        }], type: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], label: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shared/models/basket.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/models/basket.ts ***!
  \*****************************************/
/*! exports provided: Basket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Basket", function() { return Basket; });
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_0__);

class Basket {
    constructor() {
        this.id = uuid_v4__WEBPACK_IMPORTED_MODULE_0___default()();
        this.items = [];
    }
}


/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var _components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/paging-header/paging-header.component */ "./src/app/shared/components/paging-header/paging-header.component.ts");
/* harmony import */ var _components_pager_pager_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pager/pager.component */ "./src/app/shared/components/pager/pager.component.ts");
/* harmony import */ var _components_order_totals_order_totals_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/order-totals/order-totals.component */ "./src/app/shared/components/order-totals/order-totals.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _components_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/text-input/text-input.component */ "./src/app/shared/components/text-input/text-input.component.ts");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/stepper.js");
/* harmony import */ var _components_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/stepper/stepper.component */ "./src/app/shared/components/stepper/stepper.component.ts");
/* harmony import */ var _components_basket_summary_basket_summary_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/basket-summary/basket-summary.component */ "./src/app/shared/components/basket-summary/basket-summary.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");














class SharedModule {
}
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SharedModule_Factory(t) { return new (t || SharedModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"].forRoot(),
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"].forRoot(),
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"].forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"]
        ],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"],
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_3__["PagingHeaderComponent"], _components_pager_pager_component__WEBPACK_IMPORTED_MODULE_4__["PagerComponent"], _components_order_totals_order_totals_component__WEBPACK_IMPORTED_MODULE_5__["OrderTotalsComponent"], _components_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_7__["TextInputComponent"], _components_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"], _components_basket_summary_basket_summary_component__WEBPACK_IMPORTED_MODULE_10__["BasketSummaryComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"]], exports: [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"],
        _components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_3__["PagingHeaderComponent"],
        _components_pager_pager_component__WEBPACK_IMPORTED_MODULE_4__["PagerComponent"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"],
        _components_order_totals_order_totals_component__WEBPACK_IMPORTED_MODULE_5__["OrderTotalsComponent"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"],
        _components_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_7__["TextInputComponent"],
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"],
        _components_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"],
        _components_basket_summary_basket_summary_component__WEBPACK_IMPORTED_MODULE_10__["BasketSummaryComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SharedModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_3__["PagingHeaderComponent"], _components_pager_pager_component__WEBPACK_IMPORTED_MODULE_4__["PagerComponent"], _components_order_totals_order_totals_component__WEBPACK_IMPORTED_MODULE_5__["OrderTotalsComponent"], _components_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_7__["TextInputComponent"], _components_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"], _components_basket_summary_basket_summary_component__WEBPACK_IMPORTED_MODULE_10__["BasketSummaryComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"].forRoot(),
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"].forRoot(),
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"].forRoot(),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"]
                ],
                exports: [
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"],
                    _components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_3__["PagingHeaderComponent"],
                    _components_pager_pager_component__WEBPACK_IMPORTED_MODULE_4__["PagerComponent"],
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["CarouselModule"],
                    _components_order_totals_order_totals_component__WEBPACK_IMPORTED_MODULE_5__["OrderTotalsComponent"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsDropdownModule"],
                    _components_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_7__["TextInputComponent"],
                    _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_8__["CdkStepperModule"],
                    _components_stepper_stepper_component__WEBPACK_IMPORTED_MODULE_9__["StepperComponent"],
                    _components_basket_summary_basket_summary_component__WEBPACK_IMPORTED_MODULE_10__["BasketSummaryComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiUrl: 'https://localhost:5001/api/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\yshchehliuk\source\pracaDyplomowaX\Food-App_Web_\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map