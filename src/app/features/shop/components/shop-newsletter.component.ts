import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'ac-shop-newsletter',
  template: `
    <div class="bg-dark text-white mt-5">
      <div class="container py-5 text-center">
        <i class="fab fa-shopify fa-4x"></i>

        <h1 class="">Subscribe the newsletter</h1>
        <div>Subscribe our newsletter to get notified about news and updates</div>
        <div class="d-flex justify-content-center mt-2">
          <form class="row g-3" #f="ngForm" (ngSubmit)="send(f.value.email)">
            <div class="col-auto">

              <input
                [readOnly]="subscribed"
                [ngModel]="subscribed"
                type="email" class="form-control form-control-lg" placeholder="Your email address"
                name="email" required email #emailRef="ngModel"
                [ngClass]="{'is-invalid': emailRef.invalid && f.dirty, 'is-valid': emailRef.valid}"
              >
            </div>
            <div class="col-auto">
              <button
                type="submit" class="btn btn-lg btn-primary mb-3"
                [disabled]="f.invalid || subscribed"
              >Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  `,
  styles: [
  ]
})
export class ShopNewsletterComponent {

  subscribed: string | null = null;

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.subscribed = localStorage.getItem('subscribed');
  }

  send(email: string): void {
    this.http.get<{ response: string }>(`http://localhost:3000/newsletter?email=${email}`)
      .subscribe(res => {
        if (res.response === 'ok') {
          this.subscribed = email;
          localStorage.setItem('subscribed', email);
          this.notificationService.show('User subscribed!')
        }
      })
  }
}
