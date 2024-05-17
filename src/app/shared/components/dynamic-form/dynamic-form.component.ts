import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IInputField } from '../../types/input-field';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input({ required: true }) fGroup!: FormGroup;
  @Input({ required: true }) formFields: IInputField[] = [];
  @Input() buttonLabel: string = 'Submit';
  @Input() btnStyle: string = '';
  @Output() onSubmit = new EventEmitter();

  mySubmit(e: Event) {
    e.preventDefault();
    this.onSubmit.emit();
  }
}
