import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;
  let buttonTextSpan: HTMLSpanElement;
  let buttonIconSpan: HTMLSpanElement;
  let buttonDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.componentRef.setInput('buttonText', 'Some text');

    buttonDe = fixture.debugElement.query(By.css('.button'));
    buttonTextSpan = fixture.nativeElement.querySelector('.button__text');
    buttonIconSpan = fixture.nativeElement.querySelector('.button__icon');
    
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create the button component with the button type', () => {
    expect(component).toBeTruthy();
    const button = fixture.nativeElement.querySelector('.button');

    expect(button.type).toBe('button');
  });

  it('should update the button type', () => {
    fixture.componentRef.setInput('buttonType', 'submit');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.button');

    expect(button.type).toBe('submit');
  });

  it('should render span with correct button text' , () => {
    buttonTextSpan = fixture.nativeElement.querySelector('.button__text');
    expect(buttonTextSpan.textContent).toContain(component.buttonText());
  });

  it ('should not render a span with the buttonIcon class when hasIcon set to false', () => {
    expect(buttonIconSpan).toBeNull();
  });

  it ('should render a span with the buttonIcon class when hasIcon set to true', () => {
    fixture.componentRef.setInput('hasIcon', true);
    fixture.detectChanges();
    buttonIconSpan = fixture.nativeElement.querySelector('.button__icon');
    expect(buttonIconSpan).toBeTruthy();
  });

  it ('should only render the icon span when iconOnly set to true', () => {
    fixture.componentRef.setInput('hasIcon', true);
    fixture.componentRef.setInput('iconOnly', true);

    fixture.detectChanges();

    buttonTextSpan = fixture.nativeElement.querySelector('.button__text');
    buttonIconSpan = fixture.nativeElement.querySelector('.button__icon');

    expect(buttonTextSpan).toBeNull();
    expect(buttonIconSpan).toBeTruthy();
  });

  it('should emit when clicked', () => {
    const pointerEvent = new PointerEvent('pointerdown');
    spyOn(component.buttonClick, 'emit').and.callFake(() => {});

    buttonDe.triggerEventHandler('pointerdown', pointerEvent);

    expect(component.buttonClick.emit).toHaveBeenCalledWith(pointerEvent);
  });
});
