import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_PATTERN, passwordsMatch } from './password';

describe('PASSWORD_PATTERN', () => {
  // Mirrors API.Identity's RegisterVM. If these expectations start failing, the
  // client and the server disagree about what a password is.
  it('accepts a password meeting every rule', () => {
    expect(PASSWORD_PATTERN.test('Owlet1!x')).toBe(true);
  });

  it('rejects a password with no digit', () => {
    expect(PASSWORD_PATTERN.test('Owletxx!')).toBe(false);
  });

  it('rejects a password with no symbol', () => {
    expect(PASSWORD_PATTERN.test('Owlet1xy')).toBe(false);
  });

  it('rejects a password with no uppercase letter', () => {
    expect(PASSWORD_PATTERN.test('owlet1!x')).toBe(false);
  });

  it('rejects a password shorter than six characters', () => {
    expect(PASSWORD_PATTERN.test('Ow1!x')).toBe(false);
  });

  it('rejects a password longer than ten characters, which the server also does', () => {
    expect(PASSWORD_PATTERN.test('Owlet1!xyzab')).toBe(false);
  });

  it('rejects a password containing whitespace', () => {
    expect(PASSWORD_PATTERN.test('Owlet 1!x')).toBe(false);
  });
});

describe('passwordsMatch', () => {
  const build = () =>
    new FormGroup(
      {
        password: new FormControl('', { nonNullable: true }),
        confirmPassword: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      { validators: passwordsMatch('password', 'confirmPassword') }
    );

  it('reports the mismatch on the confirmation control, where the message renders', () => {
    const form = build();
    form.setValue({ password: 'Owlet1!x', confirmPassword: 'Owlet1!y' });

    expect(form.controls.confirmPassword.hasError('passwordMismatch')).toBe(true);
    expect(form.invalid).toBe(true);
  });

  it('clears the mismatch once the two agree', () => {
    const form = build();
    form.setValue({ password: 'Owlet1!x', confirmPassword: 'Owlet1!y' });
    form.setValue({ password: 'Owlet1!x', confirmPassword: 'Owlet1!x' });

    expect(form.controls.confirmPassword.hasError('passwordMismatch')).toBe(false);
    expect(form.valid).toBe(true);
  });

  it('leaves other errors on the confirmation control intact', () => {
    const form = build();
    form.setValue({ password: 'Owlet1!x', confirmPassword: '' });

    expect(form.controls.confirmPassword.hasError('required')).toBe(true);
  });

  it('stays quiet until the confirmation has been filled in', () => {
    const form = build();
    form.patchValue({ password: 'Owlet1!x' });

    expect(form.controls.confirmPassword.hasError('passwordMismatch')).toBe(false);
  });
});
