import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ProductEffects } from './product.effects';
import { ProductService } from '../product/services/product.service';
import * as ProductActions from './product.actions';
import { hot, cold } from 'jasmine-marbles';
import { ProductList } from '../core/models/product';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: productSpy }
      ]
    });

    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should return a stream with loadProductsSuccess action', () => {
    const productList: ProductList = { products: [], total: 0, skip: 0, limit: 0 };
    const action = ProductActions.loadProducts();
    //@ts-ignore
    const outcome = ProductActions.loadProductsSuccess({ productList });

    actions$ = hot('-a-', { a: action });
    const response = cold('-a|', { a: productList });
    productService.getAllProducts.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    //@ts-ignore
    expect(effects.loadProducts$).toBeObservable(expected);
  });

  it('should return a stream with loadProductsFailure action', () => {
    const action = ProductActions.loadProducts();
    const error = new Error('Error');
    const outcome = ProductActions.loadProductsFailure({ error });

    actions$ = hot('-a-', { a: action });
    const response = cold('-#|', {}, error);
    productService.getAllProducts.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    //@ts-ignore
    expect(effects.loadProducts$).toBeObservable(expected);
  });
});
