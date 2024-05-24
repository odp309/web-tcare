import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [NgClass, TitleCasePipe, ReactiveFormsModule],
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
  @Input() inputId: string | undefined;
  @Input() customStyle: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() inputLabel: string | undefined;
  @Input() choices: string[] | undefined;
  @Input() errText: string | undefined;
  @Input() fGroup!: FormGroup;
  @Input() fcName: string | number | null = null;
  inputStyle: string = 'input input-bordered w-full';

  ngOnInit(): void {
    if (this.inputType === 'radio' || this.inputType === 'checkbox') {
      this.inputStyle = this.inputType;
      return;
    }
  }
}
