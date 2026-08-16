import { Component, ElementRef, OnInit, ViewChild, inject, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';


let nextId = 0;

/**
 * Labelled text field with validation messaging, implemented as a
 * `ControlValueAccessor` so reactive forms drive it directly.
 *
 * The label is a real `<label for>` rather than a placeholder: placeholder-as-label
 * disappears the moment someone types, which is precisely when they need it.
 */
@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    imports: []
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  controlDir = inject(NgControl, { self: true });

  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  readonly type = input('text');
  readonly label = input('');
  readonly autocomplete = input<string | null>(null);
  /** Rule text, shown under the field until the field is in error. */
  readonly hint = input<string | null>(null);

  readonly inputId = `text-input-${nextId++}`;

  constructor() {
    this.controlDir.valueAccessor = this;
  }

  get control(): AbstractControl | null {
    return this.controlDir.control;
  }

  /** Points the field at whichever of its two descriptions is currently rendered. */
  get describedBy(): string | null {
    if (this.showError) {
      return `${this.inputId}-error`;
    }
    return this.hint() ? `${this.inputId}-hint` : null;
  }

  get showError(): boolean {
    const control = this.control;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  ngOnInit(): void {
    const control = this.control;
    if (!control) {
      return;
    }
    // Re-applying the validators the parent form declared keeps them attached after
    // the value accessor is swapped in.
    control.setValidators(control.validator ? [control.validator] : []);
    control.setAsyncValidators(control.asyncValidator ? [control.asyncValidator] : []);
    control.updateValueAndValidity({ emitEvent: false });
  }

  onChange: (value: string) => void = () => undefined;

  onTouched: () => void = () => undefined;

  writeValue(value: string): void {
    this.input.nativeElement.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.nativeElement.disabled = isDisabled;
  }
}
