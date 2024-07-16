import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductListUpdated: EventEmitter<ProductList[]> = new EventEmitter();
  pageList: EventEmitter <string[]> = new EventEmitter();

  private apiUrl = environment.apiUrl + "/products";

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, skip: number): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  getSearchProducts(searchKey: string): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(`${this.apiUrl}/category/search?q=${searchKey}`);
  }
}
