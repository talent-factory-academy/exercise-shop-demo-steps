import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'shop', loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule)},
      { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule )},
      { path: 'backoffice', loadChildren: () => import('./features/backoffice/backoffice.module').then(m => m.BackofficeModule) },
      { path: 'product/:id', loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)},
      { path: '', redirectTo: 'shop', pathMatch: 'full'},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
