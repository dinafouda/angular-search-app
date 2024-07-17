// src/app/store/product.actions.ts
import { createAction, props } from '@ngrx/store';
import { ProductList } from '../core/models/product';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ productList: ProductList }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: any }>());

export const setSearch = createAction('[Product] Set Search', props<{ search: string }>());
export const setCategory = createAction('[Product] Set Category', props<{ category: string }>());
export const setBrands = createAction('[Product] Set Brands', props<{ brands: string[] }>());
export const setPriceRange = createAction('[Product] Set Price Range', props<{ min: number, max: number }>());
export const setRating = createAction('[Product] Set Rating', props<{ rating: number }>());
export const setPage = createAction('[Product] Set Page', props<{ page: number }>());
export const setLimit = createAction('[Product] Set Limit', props<{ limit: number }>());
