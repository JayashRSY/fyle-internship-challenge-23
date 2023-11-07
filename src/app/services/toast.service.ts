import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ message: string, isSuccess: boolean, isError: boolean }>();

  getToastObservable() {
    return this.toastSubject.asObservable();
  }

  showSuccess(message: string) {
    this.toastSubject.next({ message, isSuccess: true, isError: false });
  }

  showError(message: string) {
    this.toastSubject.next({ message, isSuccess: false, isError: true });
  }
}
