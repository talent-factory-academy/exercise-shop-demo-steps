import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <ac-navbar ></ac-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
