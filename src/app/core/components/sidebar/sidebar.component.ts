import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Brand } from '../../models/brand';
import { ProductList , Product } from '../../models/product';
import { CategoryService } from '../../../product/services/category.service'
import { ProductService } from './../../../product/services/product.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  Categories: Category[] = [];
  Brands: Brand[] = [];
  filterbrands: string[] = [];
  fromPrice = null;
  toPrice = null;
  minValue: number = 2;
  maxValue: number = 4;
  options: Options = {
    floor: 1,
    ceil: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '';
        case LabelType.High:
          return value + '';
        default:
          return value + ' star';
      }
    },
    getPointerColor: (): string => {
      return '#002985';
    },
    getSelectionBarColor: (): string => {
      return '#002985';
    }

  };

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.Brands = this.categoryService.brands;
    this.categoryService.getCategoriesList().subscribe((categories) => {
      this.Categories = categories.slice(0, 10);
    });
  }

  filterByCategory(category: string): void {
    this.categoryService.getCategoryProducts(category).subscribe((productList) =>  {
      //@ts-ignore
      this.productService.ProductListUpdated.emit(productList.products);
      this.productService.pageList.emit(['product-list', category]);
    });
  }

  filterByBrand(brandName: string, checkBox: HTMLInputElement, index: number): void {
    this.categoryService.brands[index].checked = checkBox.checked;
    if (this.categoryService.brands[index].checked){
      this.filterbrands.push(brandName);
    }else{
      this.filterbrands =  this.filterbrands.filter(e => e !== brandName);
   }
    // if (this.filterbrands.length > 0){
    //   this.filteredProduct  = _.filter(this.maintainProductSrv.AllProducts, (product)  => {
    //     return this.filterbrands.indexOf(product.brand) !== -1 ;
    //   });
    //   this.maintainProductSrv.ProductListUpdated.emit(this.filteredProduct);
    //   this.maintainProductSrv.pageList.emit(['home', brandName]);
    // }else{
    //   this.maintainProductSrv.ProductListUpdated.emit(this.maintainProductSrv.AllProducts);
    //   this.maintainProductSrv.pageList.emit(['home']);
    // }
  }

  filterByPrice(): void {

   }
  filterByRate(): void {
    console.log('Rate')
  }
}
