import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../services/product.service';
import { Product } from '../../core/models/product';
import {ActivatedRoute, Params} from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    title: 'Product',
    description: 'Product description',
    Category: 'Category',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: 'brand',
    thumbnail: 'default',
    images: ['default'],
  };
  productImages: string[] = [];
  productImageSrc = '';
  warningFlg = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService:CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (param['id']){
      this.productService.getProductById(param['id']).subscribe((productDetails: Product) => {
        this.product = productDetails ;
        this.productImages = this.product.images;
        this.productImageSrc = this.product.thumbnail ? this.product.thumbnail : this.productImages[0];
        // this.productService.pageList.emit(['product-list', this.product.Category, this.product.title]);
      });
    }
    });
  }

  changeImage(imgsrc : string): void{
    this.productImageSrc = imgsrc;
  }


  addToCart(product: Product): void{
    this.cartService.addToCart(product).subscribe({
      next: ()=> {
        this.toastr.success('Added to Cart!', 'cart!', {
          timeOut: 3000,
        });
      }
    });
  }
}
