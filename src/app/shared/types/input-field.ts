import { AbstractControl } from '@angular/forms';

export interface IInputField {
  inputType: 'text' | 'password' | 'radio' | 'checkbox' | '';
  inputName: string;
  fcName: string | number | null;
  inputId?: string;
  customStyle?: string;
  placeholder?: string;
  inputLabel?: string;
  choices?: string[] | undefined;
  errText?: string | undefined;
  inputValue?: any;
}
