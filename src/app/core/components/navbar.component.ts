import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ac-navbar',
  template: `
    <button (click)="selectPage.emit('shop')">SHOP</button>
    <button (click)="selectPage.emit('cart')">CART</button>
    <button (click)="selectPage.emit('backoffice')">BACKOFFICE</button>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  @Output() selectPage = new EventEmitter<'cart' | 'shop' | 'backoffice'>();

  constructor() { }

  ngOnInit(): void {
  }

}
