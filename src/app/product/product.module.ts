import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSliderModule,
  ]
})
export class ProductModule { }
