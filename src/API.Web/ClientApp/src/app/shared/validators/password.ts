import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * The password rule API.Identity enforces, mirrored client-side.
 *
 * `RegisterVM` applies this as a `[RegularExpression]` attribute, so an address that
 * fails it comes back as a 400 with a wall of prose. Checking the same rule here
 * turns that into per-field feedback while the person is still typing. The upper
 * bound of ten characters is the server's, not a choice made here.
 */
export const PASSWORD_PATTERN =
  /^(?=.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?!.*\s).*$/;

export const PASSWORD_RULE =
  '6 to 10 characters, with an uppercase letter, a lowercase letter, a digit and a symbol.';

/** Cross-field check: the confirmation has to match the password. */
export function passwordsMatch(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (!password || !confirm || !confirm.value) {
      return null;
    }

    // Reported on the control the person is looking at, not on the group, so the
    // message renders next to the field that is wrong.
    if (password.value !== confirm.value) {
      confirm.setErrors({ ...confirm.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirm.hasError('passwordMismatch')) {
      const remaining = { ...confirm.errors };
      delete remaining['passwordMismatch'];
      confirm.setErrors(Object.keys(remaining).length ? remaining : null);
    }

    return null;
  };
}
