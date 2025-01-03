import { Component, Input, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-select-rounded',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select-rounded.component.html',
  styleUrls: ['./select-rounded.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectRoundedComponent),
      multi: true
    }
  ]
})
export class SelectRoundedComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() valueKey: string = '';
  @Input() labelKey: string = '';
  @Input() placeholder: string = '';
  @Input() id!: string;
  @Input() label!: string;
  selectedValue: any;

  // ControlValueAccessor methods
  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: any): void {
    // Update the value from the form model to the component
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    // Register the callback for when the value changes
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Register the callback for when the input is touched
    this.onTouched = fn;
  }

  // Handle selection change
  onSelectionChange(value: any): void {
    this.selectedValue = value;
    this.onChange(value);  // Notify Angular forms about the change
  }
}
