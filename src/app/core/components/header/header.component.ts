import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { CartService } from '../../../product/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  cartProductList: Product[] = [];

  constructor(private _formBuilder: FormBuilder, private cartService:CartService) { }
  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: [],
    })

    this.cartService.getCartItems().subscribe(data => {
      //@ts-ignore
      this.cartProductList = data.products;
    })

  }


  onSubmit(): void {
    if (this.searchForm.valid) { }
  }

  removeItemFromCart(productId: number): void {


  }

}
