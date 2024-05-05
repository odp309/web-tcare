import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';

export type TInput = {
  inputType: 'text' | 'password' | 'radio' | 'checkbox' | '';
  inputName: string;
  inputId?: string;
  customStyle?: string;
  placeholder?: string;
  inputLabel?: string;
  choices?: string[] | undefined;
  errText?: string | undefined;
};

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() formFields: TInput[] = [
    {
      inputType: 'text',
      inputName: 'name',
      inputLabel: 'Name',
    },
    {
      inputType: 'password',
      inputName: 'password',
      inputLabel: 'Password',
      errText: 'xixix',
    },
    {
      inputType: 'radio',
      inputName: 'gender',
      inputLabel: 'Gender',
      choices: ['Male', 'Female'],
      errText: 'erorr',
    },
  ];
}
