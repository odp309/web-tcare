import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LucideALargeSmall, LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [NgClass, TitleCasePipe, ReactiveFormsModule, LucideAngularModule],
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
  @Input() inputVariants: 'noIcons' | 'icons' = 'icons';
  placeholderIcon: string = '';
  inputStyle: string = 'input input-bordered w-full text-sm';

  checkInputType() {
    if (this.inputType === 'radio' || this.inputType === 'checkbox') {
      this.inputStyle = this.inputType;
      return;
    }
  }

  checkPlaceholderIcon() {
    switch (this.inputName) {
      case 'email':
        this.placeholderIcon = 'user';
        break;
      case 'password':
        this.placeholderIcon = 'lock-keyhole';
        break;
      default:
        this.placeholderIcon = '';
        break;
    }
  }

  ngOnInit(): void {
    this.checkInputType();
    this.checkPlaceholderIcon();
  }
}
