import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { IInputField } from '../../../shared/types/inputField';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent, NgClass, NgxSonnerToaster, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder, protected authService: AuthService) {
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
    if (this.username && this.username.invalid && this.username.errors) {
      if (this.username.errors['required']) {
        this.fields[0].errText = 'Username must be filled.';
      } else {
        this.fields[0].errText =
          'Username must have a minimum length of 6 characters.';
      }
    }
    if (this.password && this.password.invalid && this.password.errors) {
      if (this.password.errors['required']) {
        this.fields[1].errText = 'Password must be filled.';
      } else {
        this.fields[1].errText =
          'Password must have a minimum length of 8 characters.';
      }
    }
    if (
      this.username &&
      this.password &&
      this.username.valid &&
      this.password.valid
    ) {
      this.authService.login({
        username: this.username.value,
        password: this.password.value,
      });
    }
  }
}
