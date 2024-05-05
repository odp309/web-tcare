import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
