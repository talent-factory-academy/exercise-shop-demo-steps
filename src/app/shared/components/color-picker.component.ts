import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ac-color-picker',
  template: `

    <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
      <div
        class="mx-1 mb-3 round-border shadow-sm"
        style="width: 30px; height: 30px; border: 1px solid #fff"
        role="button"
        *ngFor="let color of colors"
        (click)="selectColor.emit(color)"
        [style.backgroundColor]="color"
        [style.border-width.px]="selectedColor === color ? 5 : 1"
        [style.border-color]="selectedColor === color ? 'orange' : '#ccc'"
      ></div>
    </div>

  `,
  styles: [
  ]
})
export class ColorPickerComponent implements OnInit {
  @Input() colors: string[] | null = [];
  @Input() selectedColor: string | null = null;
  @Output() selectColor = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

}
