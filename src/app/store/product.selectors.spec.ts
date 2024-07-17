import { ProductState, initialState } from './product.reducer';
import { selectFilteredProducts } from './product.selectors';
import { ProductList } from '../core/models/product';

describe('Product Selectors', () => {
  it('should return the filtered product list', () => {
    const state: ProductState = {
      ...initialState,
      productList: {
        products: [
          { id: 1, title: 'Product 1', Category: 'Category 1',description:'', price: 10, discountPercentage: 0, rating: 4, stock: 10, brand: 'Brand 1', thumbnail: '', images: [''] },
          { id: 2, title: 'Product 2', Category: 'Category 2',description:'', price: 20, discountPercentage: 0, rating: 5, stock: 5, brand: 'Brand 2', thumbnail: '', images: [''] }
        ],
        total: 2,
        skip: 0,
        limit: 10
      },
      search: 'Product 1',
      category: '',
      brands: [],
      priceRange: { min: 0, max: Infinity },
      rating: 0,
      page: 1,
      limit: 10,
      error: null
    };

    const productList: ProductList = selectFilteredProducts.projector(state);
    expect(productList.products.length).toBe(1);
    expect(productList.products[0].title).toBe('Product 1');
  });

  // Add other selector tests as needed
})
