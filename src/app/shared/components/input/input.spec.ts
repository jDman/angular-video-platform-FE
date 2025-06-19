import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Input } from './input';
import { FormBuilder, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [Input, FormsModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="loginForm">
      <app-input
        [id]="'firstName'"
        [name]="'firstName'"
        [labelText]="'First Name'"
        [formControl]="loginForm.controls['firstName']">
      </app-input>
    </div>
  `
})
class TestWrapper {
  private fb = new FormBuilder();

  loginForm = this.fb.group({
    firstName: ['', []],
  });
}


describe('Input', () => {
  let testHost: TestWrapper;
  let fixture: ComponentFixture<TestWrapper>;
  let labelEl: HTMLLabelElement;
  let inputEl: HTMLInputElement;

  let mockNgControl: NgControl = jasmine.createSpyObj('ngControl', ['valueAccessor']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input],
      providers: [{
        provide: NgControl,
        useValue: mockNgControl
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWrapper);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    await fixture.whenStable().then(() => {
      labelEl = fixture.nativeElement.querySelector('.input__label');
      inputEl = fixture.nativeElement.querySelector('.input__field');
    });
    expect(testHost).toBeTruthy();
    expect(labelEl.textContent?.trim()).toBe('First Name');
    expect(inputEl.id).toBe('firstName');
    expect(inputEl.name).toBe('firstName');
  });
});
