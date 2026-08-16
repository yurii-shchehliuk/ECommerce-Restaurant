/**
 * Turns whatever a service returned into a list of sentences a person can read.
 *
 * ASP.NET model-state failures arrive as `{ errors: { Field: ["message", ...] } }`,
 * a shape that renders as `[object Object]` if it reaches a template unflattened.
 * Anything else falls back to the caller's own wording rather than exposing a
 * `traceId` or a stack.
 */
export function toMessages(error: unknown, fallback: string): string[] {
  const payload = error as { errors?: unknown; message?: unknown } | null | undefined;
  const errors = payload?.errors;

  if (Array.isArray(errors)) {
    return errors.map(String);
  }

  if (errors && typeof errors === 'object') {
    const messages = Object.values(errors as Record<string, unknown>).flatMap((value) =>
      Array.isArray(value) ? value.map(String) : [String(value)]
    );
    if (messages.length) {
      return messages;
    }
  }

  if (typeof payload?.message === 'string' && payload.message) {
    return [payload.message];
  }

  return [fallback];
}
