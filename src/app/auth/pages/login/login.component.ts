import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { IInputField } from '../../../shared/types/inputField';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  message$: Observable<string> = EMPTY;

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
      this.fields[0].errText = 'Please input a valid username.';
    }
    if (this.password && this.password.invalid) {
      this.fields[1].errText =
        'Password must has have a minimum length of 6 characters.';
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
