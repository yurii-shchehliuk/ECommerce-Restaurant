import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastService } from '../services/toast.service';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-toast-host',
    templateUrl: './toast-host.component.html',
    styleUrls: ['./toast-host.component.scss'],
    imports: [
    IconComponent,
    AsyncPipe
],
})
export class ToastHostComponent {
  private toastService = inject(ToastService);

  toasts$: Observable<Toast[]>;

  constructor() {
    this.toasts$ = this.toastService.toasts$;
  }

  dismiss(toast: Toast): void {
    this.toastService.dismiss(toast.id);
  }

  trackById(_index: number, toast: Toast): number {
    return toast.id;
  }
}
