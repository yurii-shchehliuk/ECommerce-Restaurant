/**
 * The slice of Stripe.js this application actually calls.
 *
 * Stripe is loaded from its CDN by index.html rather than bundled, because Stripe
 * requires the library to be served from js.stripe.com for PCI scope reasons. That
 * leaves it untyped, so the surface used here is declared instead of reached for
 * through `any`.
 */
export interface StripeElementChangeEvent {
  elementType: 'cardNumber' | 'cardExpiry' | 'cardCvc';
  complete: boolean;
  error?: { message: string };
}

export interface StripeElement {
  mount(target: HTMLElement): void;
  destroy(): void;
  on(event: 'change', handler: (event: StripeElementChangeEvent) => void): void;
}

export interface StripeElements {
  create(type: 'cardNumber' | 'cardExpiry' | 'cardCvc'): StripeElement;
}

export interface StripePaymentResult {
  paymentIntent?: { id: string; status: string };
  error?: { message: string };
}

export interface Stripe {
  elements(): StripeElements;
  confirmCardPayment(
    clientSecret: string,
    data: { payment_method: { card: StripeElement; billing_details: { name: string } } }
  ): Promise<StripePaymentResult>;
}

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => Stripe;
  }
}
