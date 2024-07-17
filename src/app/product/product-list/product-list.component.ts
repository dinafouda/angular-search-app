import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, ProductList } from '../../core/models/product';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscriptions: Subscription[] = [];
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPages: number = 0;
  productsPerPage: number = 10;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    const combinedSubscription = this.productService.getAllProducts().subscribe((products) => {
      //@ts-ignore
      this.products = products.products;
      //@ts-ignore
      this.totalProducts = products.total;
      this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
      this.filterProducts();
    });

    this.subscriptions.push(combinedSubscription);

    const searchSubscription = this.productService.search$.subscribe(search => {
      this.filterProducts();
    });

    this.subscriptions.push(searchSubscription);

    const categorySubscription = this.productService.category$.subscribe(category => {
      this.filterProducts();
    });

    this.subscriptions.push(categorySubscription);
    const brandSubscription = this.productService.brand$.subscribe(() => {
      this.filterProducts();
    });

    this.subscriptions.push(brandSubscription);

    const priceRangeSubscription = this.productService.priceRange$.subscribe(() => {
      this.filterProducts();
    });

    this.subscriptions.push(priceRangeSubscription);

    const ratingSubscription = this.productService.rating$.subscribe(() => {
      this.filterProducts();
    });

    this.subscriptions.push(ratingSubscription);

    const limitSubscription = this.productService.limit$.subscribe(limit => {
      this.productsPerPage = limit;
      this.filterProducts();
    });

    this.subscriptions.push(limitSubscription);

    const pageSubscription = this.productService.page$.subscribe(page => {
      this.currentPage = page;
      this.filterProducts();
    });

    this.subscriptions.push(pageSubscription);
  }
   showProductDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  filterProducts() {
    const search = this.productService.searchSubject.getValue();
    const category = this.productService.categorySubject.getValue();
    const brands = this.productService.brandSubject.getValue();
    const priceRange = this.productService.priceRangeSubject.getValue();
    const rating = this.productService.ratingSubject.getValue();

    const filtered = this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || product.Category === category;
      const matchesBrand = brands.length === 0 || brands.includes(product.brand);
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesRating = product.rating >= rating;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });

    this.totalProducts = filtered.length;
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = this.currentPage * this.productsPerPage;
    this.filteredProducts = filtered.slice(start, end);
  }

  // updateFilteredProducts() {
  //   this.filteredProducts = this.products.slice((this.currentPage - 1) * this.productsPerPage, this.currentPage * this.productsPerPage);
  // }

  onPageChange(page: number) {
    this.productService.setPage(page);
  }

  onLimitChange(limit: number) {
    this.productService.setLimit(limit);
  }

  getTotalPages(): number {
    console.log('ddd', this.totalProducts)
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
