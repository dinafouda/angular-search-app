import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductList, Product } from '../../core/models/product';
import { ProductService } from '../services/product.service';
import { ProductState } from '../../store/product.reducer';
import { loadProducts, setPage, setLimit, setSearch, setCategory, setBrands, setPriceRange, setRating } from '../../store/product.actions';
import { selectFilteredProducts, selectTotalProducts, selectPage, selectLimit } from '../../store/product.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  total$: Observable<number>;
  currentPage$: Observable<number>;
  limit$: Observable<number>;


  constructor(private store: Store<ProductState>, private router: Router) {
    this.products$ = this.store.pipe(select(selectFilteredProducts));
    this.total$ = this.store.pipe(select(selectTotalProducts));
    this.currentPage$ = this.store.pipe(select(selectPage));
    this.limit$ = this.store.pipe(select(selectLimit));
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onPageChange(page: number) {
    this.store.dispatch(setPage({ page }));
    this.store.dispatch(loadProducts());
  }

  onLimitChange(limit: number) {
    this.store.dispatch(setLimit({ limit }));
    this.store.dispatch(loadProducts());
  }

  showProductDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  ngOnDestroy() {

  }
}
