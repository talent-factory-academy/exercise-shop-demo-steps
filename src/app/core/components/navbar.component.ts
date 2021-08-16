import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'ac-navbar',
  template: `
    <nav class="navbar navbar-light bg-light sticky-top shadow-lg">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">
          <i class="fab fa-shopify"></i> My Shop
        </a>
        <div class="d-flex">
          <button class="btn btn-outline-dark mx-2" routerLink="backoffice">
            <i class="fas fa-lock"></i>
            Admin
          </button>
          <button class="btn btn-outline-dark" routerLink="cart" (mouseover)="showCartPreview = true">
            <i class="fas fa-cart-plus"></i>
            Cart (€ {{cartService.getTotalCartAmount()}})
          </button>
        </div>
      </div>
    </nav>

    <ac-notification></ac-notification>

    <ac-navbar-cart-panel
      *ngIf="showCartPreview"
      (mouseleave)="showCartPreview = false"
    ></ac-navbar-cart-panel>  
  `,
})
export class NavbarComponent {
  showCartPreview: boolean = false;

  constructor(public cartService: CartService) { }
}
