import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + "/carts";
  private apiCheckoutUrl = environment.apiUrl + "/checkout";

  constructor(private http: HttpClient) { }

  addToCart(product: Product): Observable<Product>{
    const data = {
      userId: 1,
      products: [product]
        // {
        //   id: 144,
        //   quantity: 4,
        // }
    }
    return this.http.post<Product>(`${this.apiUrl}/add`, data);
  }

  updateCart(product: Product) : Observable<Product[]>{
    const data = {
      merge: true,
      products: [product]
    }
    return this.http.put<Product[]>(`${this.apiUrl}/1`, data);
  }

  deleteCart(product: Product) : Observable<Product[]>{
    const data = {
      merge: true,
      products: [product]
    }
    return this.http.delete<Product[]>(`${this.apiUrl}/1`);
  }

  getCartItems() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/1`);
  }

  clearCart() : Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  checkout(products: Product[]) : Observable<void> {
    return this.http.post<void>(this.apiCheckoutUrl, products);
  }

}
