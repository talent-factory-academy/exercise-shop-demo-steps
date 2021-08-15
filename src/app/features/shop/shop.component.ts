import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {News} from "../../model/news";
import {Hero} from "../../model/hero";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ac-shop',
  template: `
    <!--container-->
    <div class="container">
      <ac-shop-hero [data]="hero"></ac-shop-hero>

      <!--Products-->
      <div class="row row-cols-1 row-cols-lg-2  row-cols-xl-3 mt-5">
        <div class="col" *ngFor="let product of products">
          <ac-shop-item-card [product]="product" (addToCart)="addToCartHandler($event)"></ac-shop-item-card>
        </div>
      </div>

      <!--News-->
      <div class="row 3 mt-5">
        <div class="col-sm-6" *ngFor="let n of news">
          <ac-shop-item-news [news]="n"></ac-shop-item-news>
        </div>
      </div>
    </div>

    <!--Newsletter-->
    <ac-shop-newsletter></ac-shop-newsletter>
  `,
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  news: News[] = [];
  hero: Hero | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<Hero>('http://localhost:3000/hero')
      .subscribe(res => this.hero = res);

    this.http.get<Product[]>('http://localhost:3000/products')
      .subscribe(res => this.products = res);

    this.http.get<News[]>('http://localhost:3000/news')
      .subscribe(res => this.news = res)
  }

  addToCartHandler(params: { product: Product; color: string | null }) {
    console.log(params.product, params.color)
  }

}
