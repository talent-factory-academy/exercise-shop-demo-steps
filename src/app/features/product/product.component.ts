import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ac-product',
  template: `
    <div class="px-4 pt-5 my-5 text-center border-bottom">
      <h1 class="display-4 fw-bold">{{product?.label}}</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">{{product?.description}}</p>

      </div>
      <div>
        <img [src]="product?.image" class="shadow-lg p-4" width="100%" style="max-width: 50vh; margin: 0 auto">
      </div>
      <button class="btn btn-link" routerLink="/shop">Back To Shop</button>
    </div>
  `
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  selectedColor: string | null = null;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.params.id
    this.http.get<Product>(`http://localhost:3000/products/${productId}`)
      .subscribe(res => this.product = res);
  }

  addToCartHandler(): void {
    console.log(this.product, this.selectedColor)
  }
}
