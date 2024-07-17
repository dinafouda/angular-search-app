import { ProductList } from './../../models/product';
import { ProductService } from './../../../product/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../../product/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartProductList: Product[] = [];
  search: string = '';

  constructor( private cartService:CartService, private productService:ProductService) { }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      //@ts-ignore
      this.cartProductList = data.products;
    })

  }

  onSearchChange() {
    this.productService.setSearch(this.search);
  }

  removeItemFromCart(productId: number): void {}

}
