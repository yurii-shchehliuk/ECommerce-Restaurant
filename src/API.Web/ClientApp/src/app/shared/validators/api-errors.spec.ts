import { toMessages } from './api-errors';

describe('toMessages', () => {
  it('flattens an ASP.NET model-state payload into sentences', () => {
    // The exact shape API.Identity returns when RegisterVM fails validation.
    const failure = {
      title: 'One or more validation errors occurred.',
      status: 400,
      errors: {
        ConfirmPassword: ['The ConfirmPassword field is required.'],
        Password: ['Password must have 1 Uppercase, 1 Lowercase, 1 number'],
      },
    };

    expect(toMessages(failure, 'fallback')).toEqual([
      'The ConfirmPassword field is required.',
      'Password must have 1 Uppercase, 1 Lowercase, 1 number',
    ]);
  });

  it('passes through an array of messages', () => {
    expect(toMessages({ errors: ['Email is taken'] }, 'fallback')).toEqual(['Email is taken']);
  });

  it('falls back to a single message when there is no errors collection', () => {
    expect(toMessages({ message: 'Service unavailable' }, 'fallback')).toEqual([
      'Service unavailable',
    ]);
  });

  it("uses the caller's wording rather than leaking a trace id", () => {
    expect(toMessages({ traceId: '00-abc-def-00' }, 'That did not work.')).toEqual([
      'That did not work.',
    ]);
  });

  it('survives null and undefined', () => {
    expect(toMessages(null, 'fallback')).toEqual(['fallback']);
    expect(toMessages(undefined, 'fallback')).toEqual(['fallback']);
  });
});
