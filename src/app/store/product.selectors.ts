// src/app/store/product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectFilteredProducts = createSelector(selectProductState, (state) => state.productList.products);
export const selectTotalProducts = createSelector(selectProductState, (state) => state.productList.total);
export const selectPage = createSelector(selectProductState, (state) => state.page);
export const selectLimit = createSelector(selectProductState, (state) => state.limit);
export const selectSearch = createSelector(selectProductState, (state) => state.search);
export const selectCategory = createSelector(selectProductState, (state) => state.category);
export const selectBrands = createSelector(selectProductState, (state) => state.brands);
export const selectPriceRange = createSelector(selectProductState, (state) => state.priceRange);
export const selectRating = createSelector(selectProductState, (state) => state.rating);
