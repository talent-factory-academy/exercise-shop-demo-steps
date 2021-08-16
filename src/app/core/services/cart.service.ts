import { Injectable } from '@angular/core';
import { CartItem } from '../../model/cart-item';
import { Product } from '../../model/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  addItem(productToAdd: Product, selectedColor: string | null) {
    // check if product / color already added to the cart
    const itemFound: CartItem | undefined = this.items.find(item => {
      return item.product.id === productToAdd.id &&
        item.color === selectedColor
    });

    if (itemFound) {
      // product already added: increment quantity
      // this.incrementQuantity(itemFound);
      itemFound.quantity += 1;
      this.notificationService.show('You added one more product');
    } else {
      // product still not added: add to cart with quantity = 1
      if (selectedColor) {
        this.items = [...this.items, { product: productToAdd, quantity: 1, color: selectedColor }]
        this.notificationService.show('Product has been added in your cart ');
      }
    }
  }

  removeItem(itemToDelete: CartItem) {
    this.items = this.items.filter(item => {
      return !(item.product.id === itemToDelete.product.id && item.color === itemToDelete.color);
    })
    this.notificationService.show('Item removed from Cart');
  }


  incrementQuantity(itemToUpdate: CartItem) {
    if (itemToUpdate.quantity < 5) {
      this.items = this.items.map(item => {
        return item.product.id === itemToUpdate.product.id && item.color === itemToUpdate.color ?
          { ...item, quantity: item.quantity + 1} :
          { ...item }
      })
    }
  }

  decreaseQuantity(itemToUpdate: CartItem) {
    if (itemToUpdate.quantity > 1) {
      this.items = this.items.map(item => {
        return item.product.id === itemToUpdate.product.id && item.color === itemToUpdate.color  ?
          { ...item, quantity: item.quantity - 1 } :
          { ...item }
      })
    }

  }

  orderNow(formData: any) {
    console.log(formData, this.items)
    const params = new HttpParams()
      .set('formData', JSON.stringify(formData))
      .set('items', JSON.stringify(this.items));

    this.http.post('http://localhost:3000/orderNow', { formData, items: this.items})
      .subscribe(res => {
        this.notificationService.show('order sent. Thank you!')
        this.items = [];
      })
  }

  getTotalCartAmount() {
    return this.items.reduce((acc, item) => {
      return acc + (item.quantity * item.product.price)
    }, 0)
  }
}
