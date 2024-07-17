import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../../core/models/product';
import { Category } from '../../core/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  brands = [
    {name: 'Samsung', quantity: 0, checked: false},
    {name: 'Sony', quantity: 0, checked: false},
    {name: 'Xiaomi', quantity: 0, checked: false},
    {name: 'Apple', quantity: 0, checked: false},
    {name: 'Canon', quantity: 0, checked: false},
    {name: 'HUAWEI', quantity: 0, checked: false},
    {name: 'HP', quantity: 0, checked: false},
    {name: 'Lenovo', quantity: 0, checked: false},
  ];

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCategoriesList(): Observable<any>{
    return this.httpClient.get<Category[]>(`${this.apiUrl}/products/categories`);
  }





}
