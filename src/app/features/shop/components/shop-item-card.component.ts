import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/product';

@Component({
  selector: 'ac-shop-item-card',
  template: `
    <div class="card h-100 round-border shadow-lg">
      <div class="position-relative">
        <img
          class="card-img-top p-3 round-border "
          [src]="product.image"  [alt]="product.label"
          role="button"
          [routerLink]="'/product/' + product.id"
        >
        <div class="position-absolute top-50 start-50 w-75 translate-middle pe-none">
          <div class="row  row-cols-3 g-2 rounded p-2 text-white" style="background: rgba(0,0,0,0.5)">
            <div class="col text-center">
              <i class="fas fa-memory"></i>
              {{product.memory / 1000 }}
            </div>

            <div class="col text-center">
              <i class="fas fa-sim-card"></i>
              {{product.storage / 1000}}
            </div>
            <div class="col text-center">
              <i class="fas fa-mobile-alt"></i>
              {{product.display}}''
            </div>
          </div>
        </div>
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">
          {{product.label}}
        </h5>
        <p class="card-text text-secondary">{{product.description}}</p>
      </div>

      <ac-color-picker
        [colors]="product.colors"
        [selectedColor]="selectedColor"
        (selectColor)="selectedColor = $event"
      ></ac-color-picker>


      <div class="card-footer d-flex justify-content-between align-items-center">
        <!--<small class="text-muted">Last updated 3 mins ago</small>-->

        <!--<div class="h5 text-secondary">300 € + vat</div>-->
        <div class="h5 text-secondary">{{product.price | currency: '€' }} + vat</div>

        <div>
          <span *ngIf="!selectedColor">select color</span>

          <button
            class="btn icon-circle-sm px-1 ms-2 shadow-lg"
            style="color: #bbb"
            [style.background-color]="selectedColor  || '#ccc'"
            [disabled]="!selectedColor"
            (click)="addToCart.emit({ product: product, color: selectedColor })"
          >
            <i class="fas fa-cart-plus text-white"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card img:hover {
      -webkit-box-shadow: 0px 0px 100px 0px rgb(186, 186, 186);
      -moz-box-shadow: 0px 0px 100px 0px rgb(186, 186, 186);
      box-shadow: 0px 0px 100px 0px rgb(186, 186, 186);
    }
  `]
})
export class ShopItemCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ product: Product, color: string | null }>()
  selectedColor: string | null = null;

}
