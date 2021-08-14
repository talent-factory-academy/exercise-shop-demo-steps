import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <button (click)="page = 'shop'">SHOP</button>
    <button (click)="page = 'cart'">CART</button>

    <ac-shop *ngIf="page === 'shop'"></ac-shop>
    <ac-cart *ngIf="page === 'cart'"></ac-cart>
  `,
})
export class AppComponent {
  page: 'cart' | 'shop' = 'shop';
}
