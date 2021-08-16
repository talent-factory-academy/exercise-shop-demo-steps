import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './core/components/navbar.component';
import { NotificationComponent } from './core/components/notification.component';
import { NavbarCartPanelComponent } from './core/components/navbar-cart-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotificationComponent,
    NavbarCartPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
