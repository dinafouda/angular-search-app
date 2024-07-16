import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }