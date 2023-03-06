import { state } from "@angular/animations";
import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import * as AppState from "./app.state";

// actions
// export const productAction = {
//     name: "product",
//     toggleImage: "[Product] Toggle product image"
// }
export const productActionFn = {
    toggleImage: createAction("[Product] Toggle product image"),
    createDraftProduct: createAction("[Product] Create draft product", props<{ product: any }>()),
    initializeProduct: createAction("[Product] Initialize product"),
    loadItems: createAction("[Item] load"),
    loadItemsSuccess: createAction("[Item] loadItemsSuccess", props<{ items: any[] }>()),
    loadItemsError: createAction("[Item] loadItemsError", props<{ error: string }>()),
}

// state
export interface State extends AppState.State {
    product: ProductState;
}

export interface ProductState {
    displayImage: boolean;
    draftProduct: any;
}

const initialState: ProductState = {
    displayImage: true,
    draftProduct: undefined
};

// selectors
const getProductState = createFeatureSelector<ProductState>('product');
export const getDisplayImage = createSelector(getProductState, state => state.displayImage);
export const getDraftProduct = createSelector(getProductState, state => state.draftProduct);

// reducers
export const productReducer = createReducer<ProductState>(
    initialState,
    on(productActionFn.toggleImage, (state): ProductState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            displayImage: !state.displayImage
        };
    }),
    on(productActionFn.createDraftProduct, (state, action): ProductState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            draftProduct: !action.product
        };
    }),
    on(productActionFn.initializeProduct, (state): ProductState => {
        return {
            ...state,
            draftProduct: {
                id: 0
            }
        }
    })
);
