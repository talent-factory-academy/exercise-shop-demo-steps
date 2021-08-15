import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'ac-notification',
  template: `
    <div
      *ngIf="notificationService.message"
      class=" position-fixed start-0 p-3 ms-5" style="z-index: 11; top: 50px"
    >

      <div class="toast show align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <h4 class="toast-body p-3">
            {{notificationService.message}}
          </h4>
          <button
            (click)="notificationService.hide()"
            type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) { }
}
