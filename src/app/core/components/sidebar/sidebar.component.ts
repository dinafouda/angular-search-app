import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Brand } from '../../models/brand';
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

  selectedCategory: string = '';
  selectedBrands: string[] = [];
  priceRange = { min: 0, max: 1000 };
  rating = 0;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.Brands = this.categoryService.brands;
    this.categoryService.getCategoriesList().subscribe((categories) => {
      this.Categories = categories.slice(0, 10);
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.productService.setCategory(category);
  }

  filterByBrand(brands: string[]| []): void {
    this.selectedBrands = brands;
    this.productService.setBrands(brands);
  }

  filterByPrice(min: number, max: number): void {
    this.priceRange = { min, max };
    this.productService.setPriceRange(min, max);
   }
  filterByRate(rating: number): void {
    this.rating = rating;
    this.productService.setRating(rating);
  }
}
