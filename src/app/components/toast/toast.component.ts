import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  toastMessage: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  isVisible: boolean = false;

/**
 * The constructor function takes in a private _toastService parameter of type ToastService.
 * @param {ToastService} _toastService - The `_toastService` parameter is of type `ToastService`. It is
 * a service that provides functionality for displaying toast notifications.
 */
  constructor(private _toastService: ToastService) { }

 /**
  * The ngOnInit function subscribes to the toast observable and updates the toast message, success and
  * error flags, and visibility state accordingly.
  */
  ngOnInit(): void {
    this._toastService.getToastObservable().subscribe((toastData) => {
      this.toastMessage = toastData.message;
      this.isSuccess = toastData.isSuccess;
      this.isError = toastData.isError;
      this.isVisible = true;
      this.autoHideToast();
    });
  }
 /**
  * The `autoHideToast` function sets the `isVisible` property to false after a delay of 2000
  * milliseconds.
  */
  autoHideToast(): void {
    timer(2000).subscribe(() => {
      this.isVisible = false;
    });
  }
}
