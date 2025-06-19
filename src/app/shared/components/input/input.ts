import { CommonModule } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

type InputType = 'text' | 'number' | 'email' | 'password' | 'search';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss'
})
export class Input implements ControlValueAccessor {
  id = input.required<string>();
  name = input.required<string>();
  placeHolder = input<string>('');
  labelText = input<string>('');
  minLength = input<string>('');
  maxLength = input<string>('255');
  inputType = input<InputType>('text');
  isRequired = input<boolean>(false);
  isHidden = input<boolean>(false);
  isReadOnly = input<boolean>(false);
  hasLabel = input<boolean>(true);

  constructor(@Self () readonly controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  writeValue(_obj: any): void {}
  registerOnChange(_fn: any): void {}
  registerOnTouched(_fn: any): void {}
}
