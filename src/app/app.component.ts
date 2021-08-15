import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <ac-navbar (selectPage)="page = $event"></ac-navbar>

    <ac-shop *ngIf="page === 'shop'"></ac-shop>
    <ac-cart *ngIf="page === 'cart'"></ac-cart>
    <ac-backoffice *ngIf="page === 'backoffice'"></ac-backoffice>
  `,
})
export class AppComponent {
  page: 'cart' | 'shop' | 'backoffice' = 'shop';
}
