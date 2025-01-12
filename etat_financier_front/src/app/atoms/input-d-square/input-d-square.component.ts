import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-d-square',
  standalone: true,
  imports: [],
  templateUrl: './input-d-square.component.html',
  styleUrls: ['./input-d-square.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDSquareComponent),
      multi: true,
    },
  ],
})
export class InputDSquareComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type!: string;
  @Input() id!: string;
  @Input() disabled:boolean = false;
  private _value: any = '';

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val); // Notify the form of the value change
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this._value = value; // Update internal value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue; // Use the setter to update the value
    this.onChange(inputValue); // Notify Angular form about the value change
    this.onTouched(); // Notify that the input has been touched
  }
}
