import * as ProductActions from './product.actions';


describe('Product Actions', () => {
  it('should create a loadProducts action', () => {
    const action = ProductActions.loadProducts();
    expect(action.type).toBe('[Product] Load Products');
  });

  it('should create a loadProductsSuccess action', () => {
    const productList = { products: [], total: 0, skip: 0, limit: 10 };
    const action = ProductActions.loadProductsSuccess({ productList });
    expect(action.type).toBe('[Product] Load Products Success');
    expect(action.productList).toEqual(productList);
  });

  it('should create a setSearchFilter action', () => {
    const search = 'test';
    const action = ProductActions.setSearchFilter({ search });
    expect(action.type).toBe('[Product] Set Search Filter');
    expect(action.search).toBe(search);
  });

  //TODO: Test other actions similarly...
});
