// src/app/store/product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product/services/product.service';
import * as ProductActions from './product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getAllProducts().pipe(
          map(productList => ProductActions.loadProductsSuccess({ productList })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );
}
