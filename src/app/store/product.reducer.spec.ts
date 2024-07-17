import { productReducer,  ProductState } from './product.reducer';
import * as ProductActions from './product.actions';
import { ProductList } from '../core/models/product';

describe('Product Reducer', () => {
  const initialState: ProductState = {
    productList: { products: [], total: 0, skip: 0, limit: 40 },
    search: '',
    category: '',
    brands: [],
    priceRange: { min: 0, max: Infinity },
    rating: 0,
    limit: 40,
    page: 1,
    error: null,
  };

  it('should return the initial state', () => {
    const action = { type: 'unknown' };
    const state = productReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadProductsSuccess', () => {
    const productList: ProductList = { products: [{ id: 1, title: 'Test Product', description: 'Test Description', Category: 'Test Category', price: 100, discountPercentage: 0, rating: 5, stock: 10, brand: 'Test Brand', thumbnail: '', images: [''] }], total: 1, skip: 0, limit: 40 };
    const action = ProductActions.loadProductsSuccess({ productList });
    const state = productReducer(initialState, action);

    expect(state.productList).toEqual(productList);
  });

  it('should handle setSearch', () => {
    const search = 'test';
    const action = ProductActions.setSearch({ search });
    const state = productReducer(initialState, action);

    expect(state.search).toEqual(search);
  });


  it('should handle setCategory', () => {
    const category = 'electronics';
    const action = ProductActions.setCategory({ category });
    const state = productReducer(initialState, action);

    expect(state.category).toEqual(category);
  });

  it('should handle setBrands', () => {
    const brands = ['BrandA', 'BrandB'];
    const action = ProductActions.setBrands({ brands });
    const state = productReducer(initialState, action);

    expect(state.brands).toEqual(brands);
  });

  it('should handle setPriceRange', () => {
    const priceRange = { min: 50, max: 150 };
    const action = ProductActions.setPriceRange({ priceRange });
    const state = productReducer(initialState, action);

    expect(state.priceRange).toEqual(priceRange);
  });

  it('should handle setRating', () => {
    const rating = 4;
    const action = ProductActions.setRating({ rating });
    const state = productReducer(initialState, action);

    expect(state.rating).toEqual(rating);
  });

  it('should handle setLimit', () => {
    const limit = 20;
    const action = ProductActions.setLimit({ limit });
    const state = productReducer(initialState, action);

    expect(state.limit).toEqual(limit);
  });

  //TODO: Test other actions similarly...
});
