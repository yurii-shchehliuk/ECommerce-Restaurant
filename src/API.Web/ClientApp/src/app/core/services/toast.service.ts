import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  title?: string;
  message: string;
}

let nextId = 0;

/**
 * Transient notifications.
 *
 * In-repo rather than a library, for two reasons: a toast is a dozen lines of state
 * plus a template, and it is one of the few surfaces where a third-party stylesheet
 * would be visible on top of the application's own design tokens.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSource = new BehaviorSubject<Toast[]>([]);

  readonly toasts$: Observable<Toast[]> = this.toastsSource.asObservable();

  success(message: string, title?: string): void {
    this.push('success', message, title);
  }

  error(message: string, title?: string): void {
    this.push('error', message, title);
  }

  info(message: string, title?: string): void {
    this.push('info', message, title);
  }

  dismiss(id: number): void {
    this.toastsSource.next(this.toastsSource.value.filter((toast) => toast.id !== id));
  }

  private push(kind: ToastKind, message: string, title?: string): void {
    const current = this.toastsSource.value;

    // Repeating the same failure once per retry is noise, not information.
    if (current.some((toast) => toast.kind === kind && toast.message === message)) {
      return;
    }

    const toast: Toast = { id: nextId++, kind, title, message };
    this.toastsSource.next([...current, toast]);

    setTimeout(() => this.dismiss(toast.id), kind === 'error' ? 7000 : 4000);
  }
}
