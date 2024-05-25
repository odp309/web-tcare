import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { IInputField } from '../../../shared/types/input-field';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  isSubmitted: boolean = false;

  fields: IInputField[] = [
    {
      inputType: 'text',
      inputName: 'email',
      fcName: 'email',
      inputId: 'email',
      errText: '',
      placeholder: 'Email',
    },
    {
      inputType: 'password',
      inputName: 'password',
      fcName: 'password',
      inputId: 'password',
      errText: '',
      placeholder: 'Password',
    },
  ];

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.email?.errors) {
      console.log('masuk');
      this.fields[0].errText = 'Invalid email format.';
    }
    if (this.password?.errors) {
      this.fields[1].errText =
        'Password must has have a minimum length of 8 characters.';
    }
    this.isSubmitted = true;
  }

  ngDoCheck(): void {
    // if (this.isSubmitted) {
    //   console.log('email error', this.fields[0].errText);
    //   this.fields[0].errText = '';
    // }
    // if (this.fields[0].errText !== '') {
    //   return;
    // }
  }

  ngAfterViewChecked(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('object');
    if (this.isSubmitted) {
      console.log('email error', this.fields[0].errText);
      this.fields[0].errText = '';
      this.isSubmitted = false;
    }
  }
}
