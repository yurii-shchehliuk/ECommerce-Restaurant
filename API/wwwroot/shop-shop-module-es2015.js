(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shop-shop-module"],{

/***/ "./src/app/shared/models/pagination.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/models/pagination.ts ***!
  \*********************************************/
/*! exports provided: Pagination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pagination", function() { return Pagination; });
class Pagination {
    constructor() {
        this.data = [];
    }
}


/***/ }),

/***/ "./src/app/shared/models/shopParams.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/models/shopParams.ts ***!
  \*********************************************/
/*! exports provided: ShopParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopParams", function() { return ShopParams; });
class ShopParams {
    constructor() {
        this.brandId = 0;
        this.typeId = 0;
        this.sort = 'name';
        this.pageNumber = 1;
        this.pageSize = 6;
    }
}


/***/ }),

/***/ "./src/app/shop/product-details/product-details.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shop/product-details/product-details.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProductDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsComponent", function() { return ProductDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shop_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shop.service */ "./src/app/shop/shop.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var xng_breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xng-breadcrumb */ "./node_modules/xng-breadcrumb/__ivy_ngcc__/fesm2015/xng-breadcrumb.js");
/* harmony import */ var src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/basket/basket.service */ "./src/app/basket/basket.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");







function ProductDetailsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r473 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_div_1_Template_i_click_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r473); const ctx_r472 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r472.decrementQuantity(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_div_1_Template_i_click_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r473); const ctx_r474 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r474.incrementQuantity(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_div_1_Template_button_click_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r473); const ctx_r475 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r475.addItemToBasket(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Add to Cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r471 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx_r471.product.pictureUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", ctx_r471.product.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r471.product.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 6, ctx_r471.product.price));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r471.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r471.product.description);
} }
class ProductDetailsComponent {
    constructor(shopService, activateRoute, bcService, basketService) {
        this.shopService = shopService;
        this.activateRoute = activateRoute;
        this.bcService = bcService;
        this.basketService = basketService;
        this.quantity = 1;
        this.bcService.set('@productDetails', '');
    }
    ngOnInit() {
        this.loadProduct();
    }
    addItemToBasket() {
        this.basketService.addItemToBasket(this.product, this.quantity);
    }
    incrementQuantity() {
        this.quantity++;
    }
    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
    loadProduct() {
        this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
            this.product = product;
            this.bcService.set('@productDetails', product.name);
        }, error => {
            console.log(error);
        });
    }
}
ProductDetailsComponent.ɵfac = function ProductDetailsComponent_Factory(t) { return new (t || ProductDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shop_service__WEBPACK_IMPORTED_MODULE_1__["ShopService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](xng_breadcrumb__WEBPACK_IMPORTED_MODULE_3__["BreadcrumbService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_4__["BasketService"])); };
ProductDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductDetailsComponent, selectors: [["app-product-details"]], decls: 2, vars: 1, consts: [[1, "container", "mt-5"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "col-6"], [1, "img-fluid", "w-100", 3, "src", "alt"], [2, "font-size", "2em"], [1, "d-flex", "justify-content-start", "align-items-center"], [1, "fa", "fa-minus-circle", "text-warning", "mr-2", 2, "cursor", "pointer", "font-size", "2em", 3, "click"], [1, "font-weight-bold", 2, "font-size", "1.5em"], [1, "fa", "fa-plus-circle", "text-warning", "mx-2", 2, "cursor", "pointer", "font-size", "2em", 3, "click"], [1, "btn", "btn-outline-primary", "btn-lg", "ml-4", 3, "click"], [1, "row", "mt-5"], [1, "col-12", "ml-3"]], template: function ProductDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductDetailsComponent_div_1_Template, 22, 8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.product);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["CurrencyPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Nob3AvcHJvZHVjdC1kZXRhaWxzL3Byb2R1Y3QtZGV0YWlscy5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductDetailsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-product-details',
                templateUrl: './product-details.component.html',
                styleUrls: ['./product-details.component.scss']
            }]
    }], function () { return [{ type: _shop_service__WEBPACK_IMPORTED_MODULE_1__["ShopService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }, { type: xng_breadcrumb__WEBPACK_IMPORTED_MODULE_3__["BreadcrumbService"] }, { type: src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_4__["BasketService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/shop/product-item/product-item.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/shop/product-item/product-item.component.ts ***!
  \*************************************************************/
/*! exports provided: ProductItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductItemComponent", function() { return ProductItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/basket/basket.service */ "./src/app/basket/basket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





class ProductItemComponent {
    constructor(basketService) {
        this.basketService = basketService;
    }
    ngOnInit() {
    }
    addItemToBasket() {
        this.basketService.addItemToBasket(this.product);
    }
}
ProductItemComponent.ɵfac = function ProductItemComponent_Factory(t) { return new (t || ProductItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"])); };
ProductItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductItemComponent, selectors: [["app-product-item"]], inputs: { product: "product" }, decls: 14, vars: 8, consts: [[1, "card", "h-100", "shadow-sm"], [1, "image", "position-relative", 2, "cursor", "pointer"], [1, "img-fluid", "bg-info", 3, "src", "alt"], [1, "d-flex", "align-items-center", "justify-content-center", "hover-overlay"], ["type", "button", 1, "btn", "btn-primary", "fa", "fa-shopping-cart", "mr-2", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "routerLink"], [1, "card-body", "d-flex", "flex-column"], [3, "routerLink"], [1, "text-uppercase"], [1, "mb-2"]], template: function ProductItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductItemComponent_Template_button_click_4_listener($event) { return ctx.addItemToBasket(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "View");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h6", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "currency");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.product.pictureUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", ctx.product.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/shop/", ctx.product.id, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/shop/", ctx.product.id, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.product.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 6, ctx.product.price));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CurrencyPipe"]], styles: [".btn[_ngcontent-%COMP%] {\n  width: 30%;\n  height: 40px;\n}\n\n.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.image[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover   button[_ngcontent-%COMP%] {\n  -webkit-transform: none;\n          transform: none;\n  opacity: 1;\n}\n\n.hover-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: rgba(255, 255, 255, 0.5);\n  opacity: 0;\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n}\n\n.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  z-index: 1000;\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n}\n\n.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-of-type {\n  -webkit-transform: translateX(-20px);\n          transform: translateX(-20px);\n}\n\n.hover-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-of-type {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcC9wcm9kdWN0LWl0ZW0vQzpcXFVzZXJzXFx5c2hjaGVobGl1a1xcc291cmNlXFxwcmFjYUR5cGxvbW93YVhcXEZvb2QtQXBwX1dlYl9cXGNsaWVudC9zcmNcXGFwcFxcc2hvcFxccHJvZHVjdC1pdGVtXFxwcm9kdWN0LWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3Nob3AvcHJvZHVjdC1pdGVtL3Byb2R1Y3QtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSxVQUFBO0FDQ0o7O0FEQUk7RUFDSSx1QkFBQTtVQUFBLGVBQUE7RUFDQSxVQUFBO0FDRVI7O0FERUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxvQ0FBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtFQUFBLG9CQUFBO0FDQ0o7O0FEQ0k7RUFDSSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSxvQkFBQTtBQ0NSOztBRENJO0VBQ0ksb0NBQUE7VUFBQSw0QkFBQTtBQ0NSOztBRENJO0VBQ0ksbUNBQUE7VUFBQSwyQkFBQTtBQ0NSIiwiZmlsZSI6InNyYy9hcHAvc2hvcC9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0biB7XG4gICAgd2lkdGg6IDMwJTtcbiAgICBoZWlnaHQ6IDQwcHg7XG59XG5cbi5pbWFnZSA6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgJiBidXR0b24ge1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxufVxuXG4uaG92ZXItb3ZlcmxheSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LCAwLjUpO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG5cbiAgICAmIGJ1dHRvbiB7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xuICAgIH1cbiAgICAmIGJ1dHRvbjpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMHB4KTtcbiAgICB9XG4gICAgJiBidXR0b246bGFzdC1vZi10eXBlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xuICAgIH1cbn0iLCIuYnRuIHtcbiAgd2lkdGg6IDMwJTtcbiAgaGVpZ2h0OiA0MHB4O1xufVxuXG4uaW1hZ2UgOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cbi5pbWFnZSA6aG92ZXIgYnV0dG9uIHtcbiAgdHJhbnNmb3JtOiBub25lO1xuICBvcGFjaXR5OiAxO1xufVxuXG4uaG92ZXItb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IGFsbCAwLjVzO1xufVxuLmhvdmVyLW92ZXJsYXkgYnV0dG9uIHtcbiAgei1pbmRleDogMTAwMDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG59XG4uaG92ZXItb3ZlcmxheSBidXR0b246Zmlyc3Qtb2YtdHlwZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjBweCk7XG59XG4uaG92ZXItb3ZlcmxheSBidXR0b246bGFzdC1vZi10eXBlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-product-item',
                templateUrl: './product-item.component.html',
                styleUrls: ['./product-item.component.scss']
            }]
    }], function () { return [{ type: src_app_basket_basket_service__WEBPACK_IMPORTED_MODULE_1__["BasketService"] }]; }, { product: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shop/shop-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/shop/shop-routing.module.ts ***!
  \*********************************************/
/*! exports provided: ShopRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopRoutingModule", function() { return ShopRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _shop_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shop.component */ "./src/app/shop/shop.component.ts");
/* harmony import */ var _product_details_product_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-details/product-details.component */ "./src/app/shop/product-details/product-details.component.ts");






const routes = [
    { path: '', component: _shop_component__WEBPACK_IMPORTED_MODULE_2__["ShopComponent"] },
    { path: ':id', component: _product_details_product_details_component__WEBPACK_IMPORTED_MODULE_3__["ProductDetailsComponent"], data: { breadcrumb: { alias: 'productDetails' } } },
];
class ShopRoutingModule {
}
ShopRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ShopRoutingModule });
ShopRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ShopRoutingModule_Factory(t) { return new (t || ShopRoutingModule)(); }, imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
        ],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ShopRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShopRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
                ],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/shop/shop.component.ts":
/*!****************************************!*\
  !*** ./src/app/shop/shop.component.ts ***!
  \****************************************/
/*! exports provided: ShopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopComponent", function() { return ShopComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_models_shopParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/models/shopParams */ "./src/app/shared/models/shopParams.ts");
/* harmony import */ var _shop_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shop.service */ "./src/app/shop/shop.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shared_components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/paging-header/paging-header.component */ "./src/app/shared/components/paging-header/paging-header.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _product_item_product_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-item/product-item.component */ "./src/app/shop/product-item/product-item.component.ts");
/* harmony import */ var _shared_components_pager_pager_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/components/pager/pager.component */ "./src/app/shared/components/pager/pager.component.ts");









const _c0 = ["search"];
function ShopComponent_ng_container_3_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const sort_r422 = ctx.$implicit;
    const ctx_r419 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selected", ctx_r419.shopParams.sort === sort_r422.value)("value", sort_r422.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", sort_r422.name, " ");
} }
function ShopComponent_ng_container_3_li_8_Template(rf, ctx) { if (rf & 1) {
    const _r425 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShopComponent_ng_container_3_li_8_Template_li_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r425); const brand_r423 = ctx.$implicit; const ctx_r424 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r424.onBrandSelected(brand_r423.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const brand_r423 = ctx.$implicit;
    const ctx_r420 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", brand_r423.id === ctx_r420.shopParams.brandId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", brand_r423.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", brand_r423.name, " ");
} }
function ShopComponent_ng_container_3_li_12_Template(rf, ctx) { if (rf & 1) {
    const _r428 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShopComponent_ng_container_3_li_12_Template_li_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r428); const type_r426 = ctx.$implicit; const ctx_r427 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r427.onTypeSelected(type_r426.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r426 = ctx.$implicit;
    const ctx_r421 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", type_r426.id === ctx_r421.shopParams.typeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", type_r426.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", type_r426.name, " ");
} }
function ShopComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r430 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Sort");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ShopComponent_ng_container_3_Template_select_change_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r430); const ctx_r429 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r429.onSortSelected($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ShopComponent_ng_container_3_option_4_Template, 2, 3, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Brands");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "ul", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ShopComponent_ng_container_3_li_8_Template, 2, 4, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Types");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ShopComponent_ng_container_3_li_12_Template, 2, 4, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r415 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r415.sortOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r415.brands);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r415.types);
} }
function ShopComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r433 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup.enter", function ShopComponent_div_7_Template_input_keyup_enter_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r433); const ctx_r432 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r432.onSearch(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShopComponent_div_7_Template_button_click_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r433); const ctx_r434 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r434.onSearch(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShopComponent_div_7_Template_button_click_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r433); const ctx_r435 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r435.onReset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ShopComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-product-item", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r436 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("product", item_r436);
} }
function ShopComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r438 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "app-pager", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChanged", function ShopComponent_div_10_Template_app_pager_pageChanged_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r438); const ctx_r437 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r437.onPageChanged($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r418 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("pageSize", ctx_r418.shopParams.pageSize)("pageNumber", ctx_r418.shopParams.pageNumber)("totalCount", ctx_r418.totalCount);
} }
class ShopComponent {
    constructor(shopService) {
        this.shopService = shopService;
        this.sortOptions = [
            { name: 'Alphabetical', value: 'name' },
            { name: 'Price: Low to High', value: 'priceAsc' },
            { name: 'Price: High to Low', value: 'priceDesc' }
        ];
        this.shopParams = this.shopService.getShopParams();
    }
    ngOnInit() {
        this.getProducts(true);
        this.getBrands();
        this.getTypes();
    }
    getProducts(useCache = false) {
        this.shopService.getProducts(useCache).subscribe(response => {
            this.products = response.data;
            this.totalCount = response.count;
        }, error => {
            console.log(error);
        });
    }
    getBrands() {
        this.shopService.getBrands().subscribe(response => {
            this.brands = [{ id: 0, name: 'All' }, ...response];
        }, error => {
            console.log(error);
        });
    }
    getTypes() {
        this.shopService.getTypes().subscribe(response => {
            this.types = [{ id: 0, name: 'All' }, ...response];
        }, error => {
            console.log(error);
        });
    }
    onBrandSelected(brandId) {
        const params = this.shopService.getShopParams();
        params.brandId = brandId;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }
    onTypeSelected(typeId) {
        const params = this.shopService.getShopParams();
        params.typeId = typeId;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }
    onSortSelected(sort) {
        const params = this.shopService.getShopParams();
        params.sort = sort;
        this.shopService.setShopParams(params);
        this.getProducts();
    }
    onPageChanged(event) {
        const params = this.shopService.getShopParams();
        if (params.pageNumber !== event) {
            params.pageNumber = event;
            this.shopService.setShopParams(params);
            this.getProducts(true);
        }
    }
    onSearch() {
        const params = this.shopService.getShopParams();
        params.search = this.searchTerm.nativeElement.value;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }
    onReset() {
        this.searchTerm.nativeElement.value = '';
        this.shopParams = new _shared_models_shopParams__WEBPACK_IMPORTED_MODULE_1__["ShopParams"]();
        this.shopService.setShopParams(this.shopParams);
        this.getProducts();
    }
}
ShopComponent.ɵfac = function ShopComponent_Factory(t) { return new (t || ShopComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shop_service__WEBPACK_IMPORTED_MODULE_2__["ShopService"])); };
ShopComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ShopComponent, selectors: [["app-shop"]], viewQuery: function ShopComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.searchTerm = _t.first);
    } }, decls: 11, vars: 7, consts: [[1, "container", "mt-3"], [1, "row"], [1, "col-3"], [4, "ngIf"], [1, "col-9"], [1, "d-flex", "justify-content-between", "align-items-center", "pb-2"], [3, "totalCount", "pageSize", "pageNumber"], ["class", "form-inline", 4, "ngIf"], ["class", "col-4 mb-4", 4, "ngFor", "ngForOf"], ["class", "d-flex justify-content-center", 4, "ngIf"], [1, "text-warning", "ml-3", "mt-4", "mb-3"], [1, "custom-select", "mb-4", 3, "change"], [3, "selected", "value", 4, "ngFor", "ngForOf"], [1, "text-warning", "ml-3"], [1, "list-group", "my-3"], ["class", "list-group-item", 3, "active", "value", "click", 4, "ngFor", "ngForOf"], [3, "selected", "value"], [1, "list-group-item", 3, "value", "click"], [1, "form-inline"], ["placeholder", "Search", "type", "text", 1, "form-control", "mr-2", 2, "width", "300px", 3, "keyup.enter"], ["search", ""], [1, "btn", "btn-outline-primary", "my-2", 3, "click"], [1, "btn", "btn-outline-success", "ml-2", "my-2", 3, "click"], [1, "col-4", "mb-4"], [3, "product"], [1, "d-flex", "justify-content-center"], [3, "pageSize", "pageNumber", "totalCount", "pageChanged"]], template: function ShopComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ShopComponent_ng_container_3_Template, 13, 3, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "section", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-paging-header", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ShopComponent_div_7_Template, 7, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ShopComponent_div_9_Template, 2, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ShopComponent_div_10_Template, 2, 3, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.types && ctx.brands);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("totalCount", ctx.totalCount)("pageSize", ctx.shopParams.pageSize)("pageNumber", ctx.shopParams.pageNumber);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.products);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.products);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.totalCount > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _shared_components_paging_header_paging_header_component__WEBPACK_IMPORTED_MODULE_4__["PagingHeaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_x"], _product_item_product_item_component__WEBPACK_IMPORTED_MODULE_6__["ProductItemComponent"], _shared_components_pager_pager_component__WEBPACK_IMPORTED_MODULE_7__["PagerComponent"]], styles: [".list-group-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n  padding: 10px 20px;\n  font-size: 1.1em;\n}\n.list-group-item[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.list-group-item.active[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n.list-group-item[_ngcontent-%COMP%]:not(.active):hover {\n  color: #fff;\n  background-color: rgba(233, 86, 32, 0.705);\n  border-radius: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcC9DOlxcVXNlcnNcXHlzaGNoZWhsaXVrXFxzb3VyY2VcXHByYWNhRHlwbG9tb3dhWFxcRm9vZC1BcHBfV2ViX1xcY2xpZW50L3NyY1xcYXBwXFxzaG9wXFxzaG9wLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaG9wL3Nob3AuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNDSjtBRENJO0VBQ0ksYUFBQTtBQ0NSO0FERUk7RUFDSSxtQkFBQTtBQ0FSO0FER0k7RUFDSSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtBQ0RSIiwiZmlsZSI6InNyYy9hcHAvc2hvcC9zaG9wLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtZ3JvdXAtaXRlbSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgZm9udC1zaXplOiAxLjFlbTtcblxuICAgICY6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgICYuYWN0aXZlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB9XG5cbiAgICAmOm5vdCguYWN0aXZlKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzMywgODYsIDMyLCAwLjcwNSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgfVxufSIsIi5saXN0LWdyb3VwLWl0ZW0ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMTBweCAyMHB4O1xuICBmb250LXNpemU6IDEuMWVtO1xufVxuLmxpc3QtZ3JvdXAtaXRlbTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4ubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG4ubGlzdC1ncm91cC1pdGVtOm5vdCguYWN0aXZlKTpob3ZlciB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzMywgODYsIDMyLCAwLjcwNSk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShopComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-shop',
                templateUrl: './shop.component.html',
                styleUrls: ['./shop.component.scss']
            }]
    }], function () { return [{ type: _shop_service__WEBPACK_IMPORTED_MODULE_2__["ShopService"] }]; }, { searchTerm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['search']
        }] }); })();


/***/ }),

/***/ "./src/app/shop/shop.module.ts":
/*!*************************************!*\
  !*** ./src/app/shop/shop.module.ts ***!
  \*************************************/
/*! exports provided: ShopModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopModule", function() { return ShopModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shop_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shop.component */ "./src/app/shop/shop.component.ts");
/* harmony import */ var _product_item_product_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-item/product-item.component */ "./src/app/shop/product-item/product-item.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _product_details_product_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product-details/product-details.component */ "./src/app/shop/product-details/product-details.component.ts");
/* harmony import */ var _shop_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shop-routing.module */ "./src/app/shop/shop-routing.module.ts");








class ShopModule {
}
ShopModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ShopModule });
ShopModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ShopModule_Factory(t) { return new (t || ShopModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _shop_routing_module__WEBPACK_IMPORTED_MODULE_6__["ShopRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ShopModule, { declarations: [_shop_component__WEBPACK_IMPORTED_MODULE_2__["ShopComponent"], _product_item_product_item_component__WEBPACK_IMPORTED_MODULE_3__["ProductItemComponent"], _product_details_product_details_component__WEBPACK_IMPORTED_MODULE_5__["ProductDetailsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        _shop_routing_module__WEBPACK_IMPORTED_MODULE_6__["ShopRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShopModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_shop_component__WEBPACK_IMPORTED_MODULE_2__["ShopComponent"], _product_item_product_item_component__WEBPACK_IMPORTED_MODULE_3__["ProductItemComponent"], _product_details_product_details_component__WEBPACK_IMPORTED_MODULE_5__["ProductDetailsComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                    _shop_routing_module__WEBPACK_IMPORTED_MODULE_6__["ShopRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/shop/shop.service.ts":
/*!**************************************!*\
  !*** ./src/app/shop/shop.service.ts ***!
  \**************************************/
/*! exports provided: ShopService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopService", function() { return ShopService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _shared_models_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/models/pagination */ "./src/app/shared/models/pagination.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_models_shopParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/models/shopParams */ "./src/app/shared/models/shopParams.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");








class ShopService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://localhost:5001/api/';
        this.products = [];
        this.brands = [];
        this.types = [];
        this.pagination = new _shared_models_pagination__WEBPACK_IMPORTED_MODULE_2__["Pagination"]();
        this.shopParams = new _shared_models_shopParams__WEBPACK_IMPORTED_MODULE_4__["ShopParams"]();
    }
    getProducts(useCache) {
        if (useCache === false) {
            this.products = [];
        }
        if (this.products.length > 0 && useCache === true) {
            const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);
            if (this.shopParams.pageNumber <= pagesReceived) {
                this.pagination.data =
                    this.products.slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize, this.shopParams.pageNumber * this.shopParams.pageSize);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.pagination);
            }
        }
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        if (this.shopParams.brandId !== 0) {
            params = params.append('brandId', this.shopParams.brandId.toString());
        }
        if (this.shopParams.typeId !== 0) {
            params = params.append('typeId', this.shopParams.typeId.toString());
        }
        if (this.shopParams.search) {
            params = params.append('search', this.shopParams.search);
        }
        params = params.append('sort', this.shopParams.sort);
        params = params.append('pageIndex', this.shopParams.pageNumber.toString());
        params = params.append('pageSize', this.shopParams.pageSize.toString());
        return this.http.get(this.baseUrl + 'products', { observe: 'response', params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(response => {
            this.products = [...this.products, ...response.body.data];
            this.pagination = response.body;
            return this.pagination;
        }));
    }
    getShopParams() {
        return this.shopParams;
    }
    setShopParams(params) {
        this.shopParams = params;
    }
    getProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(product);
        }
        return this.http.get(this.baseUrl + 'products/' + id);
    }
    getBrands() {
        if (this.brands.length > 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.brands);
        }
        return this.http.get(this.baseUrl + 'products/brands').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(response => {
            this.brands = response;
            return response;
        }));
    }
    getTypes() {
        if (this.types.length > 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.types);
        }
        return this.http.get(this.baseUrl + 'products/types').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(response => {
            this.types = response;
            return response;
        }));
    }
}
ShopService.ɵfac = function ShopService_Factory(t) { return new (t || ShopService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
ShopService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ShopService, factory: ShopService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShopService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=shop-shop-module-es2015.js.map