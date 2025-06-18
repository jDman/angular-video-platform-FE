import { Component, input, output } from '@angular/core';

type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.scss'
})
export class Button {
  buttonType = input<ButtonType>('button');
  buttonText = input.required<string>();
  hasIcon = input<boolean>(false);
  iconOnly = input<boolean>(false);
  buttonClick = output<PointerEvent>();

  handleButtonClick(event: PointerEvent) {
    event.preventDefault();
    this.buttonClick.emit(event);
  }
}
