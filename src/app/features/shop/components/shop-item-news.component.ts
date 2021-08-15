import { Component, Input } from '@angular/core';
import { News } from '../../../model/news';

@Component({
  selector: 'ac-shop-item-news',
  template: `
    <div class="card round-border ">
      <div class="card-body">
        <h5 class="card-title">{{news.title}}</h5>
        <p class="card-text">{{news.description}}</p>
        <a [href]="news.url" target="_blank" class="btn btn-dark round-border">
          <i class="fas fa-external-link-alt"></i>
          Visit
        </a>
      </div>
    </div>
  `,
})
export class ShopItemNewsComponent {
  @Input() news!: News;
}
