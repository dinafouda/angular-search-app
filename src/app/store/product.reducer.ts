import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductList } from '../core/models/product';

export interface ProductState {
  productList: ProductList;
  search: string;
  category: string;
  brands: string[];
  priceRange: { min: number, max: number };
  rating: number;
  limit: number;
  page: number;
  error: any;
}

const initialState: ProductState = {
  productList: { products: [], total: 0, skip: 0, limit: 25 },
  search: '',
  category: '',
  brands: [],
  priceRange: { min: 0, max: Infinity },
  rating: 0,
  limit: 25,
  page: 1,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { productList }) => ({ ...state, productList })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.setSearch, (state, { search }) => ({ ...state, search })),
  on(ProductActions.setCategory, (state, { category }) => ({ ...state, category })),
  on(ProductActions.setBrands, (state, { brands }) => ({ ...state, brands })),
  on(ProductActions.setPriceRange, (state, { min, max }) => ({ ...state, priceRange: { min, max } })),
  on(ProductActions.setRating, (state, { rating }) => ({ ...state, rating })),
  on(ProductActions.setPage, (state, { page }) => ({ ...state, page })),
  on(ProductActions.setLimit, (state, { limit }) => ({ ...state, limit }))
);
