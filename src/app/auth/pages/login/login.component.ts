import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { IInputField } from '../../../shared/types/input-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  fields: IInputField[] = [
    {
      inputType: 'text',
      inputName: 'username',
      fcName: 'username',
      inputId: 'username',
      errText: '',
      placeholder: 'Username',
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

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.username && this.username.invalid) {
      this.fields[0].errText =
        'Username must have a minimum length of 6 characters.';
    }
    if (this.password && this.password.invalid) {
      this.fields[1].errText =
        'Password must has have a minimum length of 8 characters.';
    }
    if (
      this.username &&
      this.password &&
      this.username.valid &&
      this.password.valid
    ) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
