import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { IInputField } from '../../../shared/types/input-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: ['', Validators.email],
    });
  }
  fields: IInputField[] = [
    {
      inputType: 'text',
      inputName: 'email',
      inputLabel: 'email',
      fcName: 'email',
      inputId: 'email',
      errText: '',
      placeholder: 'Email',
    },
    {
      inputType: 'password',
      inputName: 'password',
      inputLabel: 'Password',
      fcName: 'email',
      inputId: 'email',
      errText: '',
      placeholder: 'Password',
    },
    {
      inputType: 'checkbox',
      inputName: 'password',
      inputLabel: 'Password',
      fcName: 'email',
      inputId: 'email',
      errText: '',
      placeholder: 'Password',
      choices: ['sada', 'sadasd'],
    },
  ];

  get email() {
    return this.form.get('email');
  }
  printHello() {
    console.log('hello');
    console.log('xixi');
  }
}
