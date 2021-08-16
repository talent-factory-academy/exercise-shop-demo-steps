import { Component } from '@angular/core';
import { NgModel} from "@angular/forms";
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'ac-cart',
  template: `
    <div class="container bg-light my-3 py-3 round-border">

      <div class="py-5 text-center">
        <i class="fab fa-shopify fa-4x"></i>
        <h2>Checkout form</h2>
        <p class="lead">Fill all fields and order now. Free shipping</p>
      </div>

      <div class="text-center mt-4 h3" *ngIf="!cartService.items.length">
        No products in your cart
      </div>

      <div class="row g-5" *ngIf="cartService.items.length">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">
              TOTAL € {{cartService.getTotalCartAmount()}}
            </span>
          </h4>
          <ul class="list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between lh-sm"
              *ngFor="let item of cartService.items"
            >
              <div>
                <i class="fas fa-trash fa-2x me-2" (click)="cartService.removeItem(item)"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="my-0">{{item.product.label}} - {{item.color}}</h6>
                <small class="text-muted">

                  € {{item.product.price * item.quantity}}

                </small>
              </div>
              <span class="text-muted">
                <button class="bg-dark text-white icon-circle-sm" (click)="cartService.decreaseQuantity(item)">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="h mx-2">{{item.quantity}}</span>
                <button class="bg-dark text-white icon-circle-sm" (click)="cartService.incrementQuantity(item)">
                  <i class="fas fa-plus"></i>
                </button>
              </span>
              
            </li>
          </ul>
        </div>

        <form #f="ngForm" (submit)="submitHandler(f.value)" class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">First name</label>
              <input type="text" class="form-control" required ngModel name="firstName" #firstNameRef="ngModel"
                     [ngClass]="{ 'is-invalid': firstNameRef.invalid, 'is-valid': firstNameRef.valid} "
                     >
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" required ngModel name="lastName" #lastNameRef="ngModel"
                     [ngClass]="{ 'is-invalid': lastNameRef.invalid, 'is-valid': lastNameRef.valid} "
                     >
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>


            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
              <input type="email" class="form-control" placeholder="you@example.com" ngModel name="email" required email #emailRef="ngModel" [ngClass]="checkField(emailRef)">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" placeholder="1234 Main St" required ngModel name="address" #addressRef="ngModel" [ngClass]="checkField(addressRef)">
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>


            <div class="col-md-5">
              <label for="country" class="form-label">Country</label>
              <select class="form-select"  required [ngModel] name="country" #countryRef="ngModel" [ngClass]="checkField(countryRef)">
                <option [value]="null">Choose...</option>
                <option value="it">Italy</option>
                <option value="us">United States</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Zip</label>
              <input type="text" class="form-control"  required ngModel name="zip" minlength="4" maxlength="5" #zipRef="ngModel" [ngClass]="checkField(zipRef)">
              <div class="invalid-feedback">
                Zip code required (4 or 5 chars)
              </div>
            </div>
          </div>

          <hr class="my-4">

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" required ngModel value="creditCard">
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required ngModel value="bankTransfer">
              <label class="form-check-label" for="debit">Bank Transfer</label>
            </div>
          </div>

          <div class="row gy-3" *ngIf="f.value.paymentMethod === 'creditCard'">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" required ngModel name="cardName" #cardNameRef="ngModel"
                     [ngClass]="checkField(cardNameRef)">
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" required minlength="16" maxlength="16" ngModel name="cardNumber"
                     #cardNumberRef="ngModel" [ngClass]="checkField(cardNumberRef)">
              <div class="invalid-feedback">
                Credit card number is required (16 numbers)
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" placeholder="12/22"
                     required pattern="^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$"
                     ngModel name="cardExpiration" #cardExpirationRef="ngModel"
                     [ngClass]="checkField(cardExpirationRef)">
              <div class="invalid-feedback">
                Expiration date required {{cardExpirationRef.errors | json}}
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" required minlength="3" maxlength="3" ngModel name="cardCVV"
                     #cardCVVRef="ngModel" [ngClass]="checkField(cardCVVRef)">
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>

          <hr class="my-4">



          <button class="w-100 btn btn-primary btn-lg" type="submit" [disabled]="f.invalid">Confirm Order</button>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class CartComponent {
  constructor(public cartService: CartService) { }

  submitHandler(formData: any) {
    this.cartService.orderNow(formData)
  }

  checkField(input: NgModel) {
    return { 'is-invalid': input.invalid, 'is-valid': input.valid}
  }
}
