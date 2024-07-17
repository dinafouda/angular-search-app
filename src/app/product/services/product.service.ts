import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { Product, ProductList } from '../../core/models/product';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductListUpdated: EventEmitter<ProductList[]> = new EventEmitter();
  pageList: EventEmitter<string[]> = new EventEmitter();

  productList: ProductList[] = [];


  searchSubject = new BehaviorSubject<string>('');
  categorySubject = new BehaviorSubject<string>('');
  brandSubject = new BehaviorSubject<string[]>([]);
  priceRangeSubject = new BehaviorSubject<{ min: number, max: number }>({ min: 0, max: Infinity });
  ratingSubject = new BehaviorSubject<number>(0);
  limitSubject = new BehaviorSubject<number>(25);
  pageSubject = new BehaviorSubject<number>(1);


  search$ = this.searchSubject.asObservable();
  category$ = this.categorySubject.asObservable();
  brand$ = this.brandSubject.asObservable();
  priceRange$ = this.priceRangeSubject.asObservable();
  rating$ = this.ratingSubject.asObservable();
  limit$ = this.limitSubject.asObservable();
  page$ = this.pageSubject.asObservable();


  private apiUrl = environment.apiUrl + "/products";

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<ProductList[]> {
    return combineLatest([this.search$, this.category$, this.brand$, this.priceRange$, this.rating$, this.limit$, this.page$]).pipe(
      switchMap(([search, category, brands, priceRange, rating, limit, page]) => {
        let limitSkip = `?limit=${limit}&skip=${(page - 1) * limit}`;
        let params = '';
        if (search) {
          params = `/search?q=${search}`;
          console.log(params)
        }
        else if (category) {
          params = `/category/${category}`;
        }
        else if (brands.length > 0) {
          params = `&brands=${brands.join(',')}`;
        }
        else if (priceRange.min >= 0 && priceRange.max < Infinity) {
          params += `&price_min=${priceRange.min}&price_max=${priceRange.max}`;
        }
        else if (rating > 0) {
          params = `&rating=${rating}`;
        } else if(limit || page) {
          params = limitSkip;
        }
        const url = `${this.apiUrl}${params}`;
        return this.httpClient.get<ProductList[]>(url).pipe(
          catchError(() => of([])) // Handle error and return empty array on failure
        );
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  getCategoryProducts(category: string): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(`${this.apiUrl}/category/${category}`);
  }

  setPage(page: number) {
    this.pageSubject.next(page);
  }

  setLimit(limit: number) {
    this.limitSubject.next(limit);
  }

  setSearch(search: string) {
    this.searchSubject.next(search);
  }

  setCategory(category: string) {
    this.categorySubject.next(category);
  }

  setBrands(brands: string[]) {
    this.brandSubject.next(brands);
  }

  setPriceRange(min: number, max: number) {
    this.priceRangeSubject.next({ min, max });
  }

  setRating(rating: number) {
    this.ratingSubject.next(rating);
  }
}
