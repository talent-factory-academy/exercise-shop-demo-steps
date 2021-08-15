import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ac-backoffice',
  template: `
    <div class="container bg-light my-3 py-3 round-border">
      <div class="row">
        <div class="col">
          <h2>
            <i class="fas fa-plus-circle" (click)="selectedProduct = null; colors = []"></i>
            Product List
          </h2>
          <ul class="list-group">
            <li
              class="list-group-item "
              *ngFor="let product of products"
              [ngClass]="{'list-group-item-dark': product.id === selectedProduct?.id}"
              (click)="selectedProduct = product; colors = product.colors"
            >
              <img [src]="product.image" height="50" class="mx-2">
              {{product.label}}
            </li>
          </ul>
        </div>

        <div class="col">
          <h2>
            {{selectedProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}}
          </h2>
 
          <form #f="ngForm" (submit)="saveHandler(f)">
            <input type="text" required class="form-control my-1" [ngModel]="selectedProduct?.label" name="label" minlength="3" placeholder="Product name">
            <textarea class="form-control" required cols="30" [ngModel]="selectedProduct?.description" name="escription" placeholder="Description"></textarea>
            <input type="number" required class="form-control my-1" [ngModel]="selectedProduct?.price" name="price" placeholder="Price">
            <input type="url" required class="form-control my-1" [ngModel]="selectedProduct?.image" name="image" placeholder="Image url (es. http://www...)">
            <input type="number" required step="1" min="1" max="100" class="form-control my-1" [ngModel]="selectedProduct?.display" name="display" placeholder="Display Size (1-100)">
            <input type="number" required step="1" min="1" max="100000000" class="form-control my-1" [ngModel]="selectedProduct?.storage" name="storage" placeholder="Storage (in Mb)">
            <input type="number" required step="1" min="1" max="100000" class="form-control my-1" [ngModel]="selectedProduct?.memory" name="memory" placeholder="Memory(in Mb)">
            
            <!--Add colors-->
            <div class="d-flex align-items-center gap-2 mb-3">
              <input type="color" #colorInput>
              <i class="fas fa-plus-circle" (click)="colors.push(colorInput.value);"></i>
            </div>
            
            <!--Color List-->
            <div class="d-flex gap-3 ">
              <div
                *ngFor="let color of colors; let i = index"
                class="position-relative"
                [style.background]="color" 
                style="width: 80px; height: 40px; "
              >
                  <button type="button" class="btn position-absolute top-100 start-50 translate-middle badge rounded-pill bg-danger">
                    <i class="fas fa-trash text-white" (click)="colors.splice(i, 1)"></i>
                  </button>
              </div>
            </div>

            <hr>

            <div class="btn-group">
              <button type="submit" class="btn btn-primary" [disabled]="f.invalid || !colors.length">
                {{selectedProduct ? 'EDIT' : 'ADD'}}
              </button>
              <button 
                type="button" class="btn btn-danger"
                *ngIf="selectedProduct" (click)="deleteHandler()">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  `
})
export class BackofficeComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  colors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/products')
      .subscribe(res => {
        this.products = res;
      });

  }



  saveHandler(form: NgForm): void {
    if (this.selectedProduct) {
      this.editHandler(form)
    } else {
      this.addHandler(form)
    }
  }

  addHandler(form: NgForm): void {
    this.http.post<Product>('http://localhost:3000/products', { ...form.value, colors: this.colors })
      .subscribe(res => {
        this.products = [...this.products, res];
        form.reset();
      });

  }


  editHandler(form: NgForm): void {
    this.http.patch<Product>(`http://localhost:3000/products/${this.selectedProduct?.id}`, { ...form.value, colors: this.colors })
      .subscribe(res => {
        this.products = this.products.map(p => {
          return p.id === this.selectedProduct?.id ? res : p;
        })
      });
  }

  deleteHandler(): void {
    this.http.delete<Product>(`http://localhost:3000/products/${this.selectedProduct?.id}`)
      .subscribe(res => {
        this.products = this.products.filter(p => p.id !== this.selectedProduct?.id);
        this.selectedProduct = null;
        // NEW
        this.colors = [];
      });
  }
}
