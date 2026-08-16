import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.component.html',
  styleUrls: ['./toast-host.component.scss'],
  standalone: false,
})
export class ToastHostComponent {
  toasts$: Observable<Toast[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  dismiss(toast: Toast): void {
    this.toastService.dismiss(toast.id);
  }

  trackById(_index: number, toast: Toast): number {
    return toast.id;
  }
}
