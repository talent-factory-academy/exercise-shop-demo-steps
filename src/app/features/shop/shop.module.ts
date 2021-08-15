import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopHeroComponent } from './components/shop-hero.component';
import { ShopItemCardComponent } from './components/shop-item-card.component';
import { ShopItemNewsComponent } from './components/shop-item-news.component';
import { ShopNewsletterComponent } from './components/shop-newsletter.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ShopComponent,
    ShopHeroComponent,
    ShopItemCardComponent,
    ShopItemNewsComponent,
    ShopNewsletterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ShopComponent }
    ])
  ]
})
export class ShopModule { }
