import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Toast, ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.component.html',
  styleUrls: ['./toast-host.component.css'],
  imports: [IconComponent],
})
export class ToastHostComponent {
  private toastService = inject(ToastService);

  readonly toasts = toSignal(this.toastService.toasts$, { initialValue: [] as Toast[] });

  dismiss(toast: Toast): void {
    this.toastService.dismiss(toast.id);
  }
}
