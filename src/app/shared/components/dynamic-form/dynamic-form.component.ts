import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IInputField } from '../../types/inputField';
import { ButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) fGroup!: FormGroup;
  @Input({ required: true }) formFields: IInputField[] = [];
  @Input() buttonLabel: string = 'Submit';
  @Input() isButtonDisabled: boolean | null = false;
  @Input() btnStyle: string = '';
  @Output() onSubmit = new EventEmitter();

  private subscription!: Subscription;

  mySubmit(e: Event) {
    e.preventDefault();
    this.onSubmit.emit();
  }

  subscribeToFormControlStatusChanges() {
    for (const field of this.formFields) {
      const getForm = this.fGroup.get(
        field.fcName as string | (string | number)[]
      );
      if (getForm) {
        this.subscription = getForm.valueChanges.subscribe(() => {
          field.errText = '';
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.subscribeToFormControlStatusChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
