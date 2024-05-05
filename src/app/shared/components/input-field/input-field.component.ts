import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent implements OnInit {
  @Input({ required: true }) inputType:
    | 'text'
    | 'password'
    | 'radio'
    | 'checkbox'
    | '' = '';
  @Input({ required: true }) inputName: string = '';
  @Input() inputId: string | undefined = '';
  @Input() customStyle: string | undefined = '';
  @Input() placeholder: string | undefined = '';
  @Input() inputLabel: string | undefined = '';
  @Input() choices: string[] | undefined = [];
  @Input() errText: string | undefined = '';
  inputStyle: string = 'input input-bordered w-full max-w-lg';

  ngOnInit(): void {
    if (this.inputType === 'radio' || this.inputType === 'checkbox') {
      this.inputStyle = this.inputType;
      return;
    }
  }
}
