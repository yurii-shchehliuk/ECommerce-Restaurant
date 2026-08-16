import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
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
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  @Input() type = 'text';
  @Input() label = '';
  @Input() autocomplete: string | null = null;

  readonly inputId = `text-input-${nextId++}`;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  get control(): AbstractControl | null {
    return this.controlDir.control;
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
