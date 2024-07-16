import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, ProductList } from '../../core/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 20;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    //@ts-ignore
    this.productService.getAllProducts().subscribe((productList: ProductList) => {
      this.products = productList.products;
    });
  }
   showProductDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
