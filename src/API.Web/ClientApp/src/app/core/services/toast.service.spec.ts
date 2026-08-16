import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('starts with nothing on screen', async () => {
    expect(await firstValueFrom(service.toasts$)).toEqual([]);
  });

  it('carries the kind through, so the host can colour it', async () => {
    service.error('API.Basket did not answer');

    const [toast] = await firstValueFrom(service.toasts$);
    expect(toast.kind).toBe('error');
    expect(toast.message).toBe('API.Basket did not answer');
  });

  it('does not repeat a message that is already on screen', async () => {
    service.error('Same failure');
    service.error('Same failure');

    expect((await firstValueFrom(service.toasts$)).length).toBe(1);
  });

  it('treats the same words of a different kind as a different notification', async () => {
    service.error('Saved');
    service.success('Saved');

    expect((await firstValueFrom(service.toasts$)).length).toBe(2);
  });

  it('dismisses on request', async () => {
    service.success('Address saved');
    const [toast] = await firstValueFrom(service.toasts$);

    service.dismiss(toast.id);

    expect(await firstValueFrom(service.toasts$)).toEqual([]);
  });

  it('clears a confirmation on its own', fakeAsync(() => {
    service.success('Address saved');
    tick(4000);

    let count = -1;
    service.toasts$.subscribe((toasts) => (count = toasts.length)).unsubscribe();
    expect(count).toBe(0);
  }));

  it('leaves an error up for longer than a confirmation', fakeAsync(() => {
    service.error('Something broke');
    tick(4000);

    let count = -1;
    service.toasts$.subscribe((toasts) => (count = toasts.length)).unsubscribe();
    expect(count).toBe(1);

    tick(3000);
    service.toasts$.subscribe((toasts) => (count = toasts.length)).unsubscribe();
    expect(count).toBe(0);
  }));
});
