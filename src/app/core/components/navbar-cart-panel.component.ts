import {Component} from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'ac-navbar-cart-panel',
  template: `
    <div class="position-relative"  >
      <div class="position-fixed end-0 m-2 " style="z-index: 10; top: 60px" >
        <div class="overflow-scroll bg-white p-3 rounded-3 shadow-lg " style="width: 350px; height: 340px;"  >

          <!--no product message-->
          <div class="text-center" *ngIf="!cartService.items.length">
            No products in your cart
          </div>

          <!--cart items-->
          <div
            class="d-flex justify-content-between align-items-center border-bottom p-2 pe-none"
            *ngFor="let item of cartService.items"
          >
            <div class="d-flex ">
              <div>
                <img
                  class="round-border me-2"
                  width="70"
                  [src]="item.product.image"  alt="..."
                >
              </div>
              <div  style=" width: 130px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden ">
                {{item.product.label}}
                <div class="text-secondary">Qty: {{item.quantity}}</div>
                <div class="text-secondary">Color: {{item.color}}</div>
              </div>
            </div>
            <div>€ {{item.quantity * item.product.price}}</div>
          </div>


          <div class="d-flex justify-content-center mt-2">
            <button
              class="btn btn-dark rounded-3" *ngIf="cartService.items.length"
              routerLink="cart"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavbarCartPanelComponent {
  constructor(public cartService: CartService) { }
}
