import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ShopComponent } from './features/shop/shop.component';
import { CartComponent } from './features/cart/cart.component';
import { HttpClientModule } from "@angular/common/http";
import { BackofficeComponent } from './features/backoffice/backoffice.component';
import { NavbarComponent } from './core/components/navbar.component';
import { ShopHeroComponent } from './features/shop/components/shop-hero.component';
import { ShopItemCardComponent } from './features/shop/components/shop-item-card.component';
import { ShopItemNewsComponent } from './features/shop/components/shop-item-news.component';
import { ShopNewsletterComponent } from './features/shop/components/shop-newsletter.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CartComponent,
    BackofficeComponent,
    NavbarComponent,
    ShopHeroComponent,
    ShopItemCardComponent,
    ShopItemNewsComponent,
    ShopNewsletterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
