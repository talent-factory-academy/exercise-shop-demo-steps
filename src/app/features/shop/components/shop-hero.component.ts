import { Component, Input } from '@angular/core';
import { Hero } from '../../../model/hero';

@Component({
  selector: 'ac-shop-hero',
  template: `
    <!--hero-->
    <div class="card round-border overflow-hidden mt-3" style="height: 300px">
      <img
        class="card-img round-border"
        style="object-fit: cover"
        [src]="data?.image"  alt="Hero"
      >
      <div class="card-img-overlay mt-5">
        <h1 class="card-title">{{data?.title}}</h1>
        <h4 class="card-text" [innerHTML]="data?.description"></h4>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ShopHeroComponent {
  @Input() data: Hero | null = null
}
