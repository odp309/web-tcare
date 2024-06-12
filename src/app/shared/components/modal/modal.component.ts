import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() variants: 'plain' | 'danger' = 'plain';
  @Input() btnCloseTitle = 'Close';
  @Input() customStyle = '';
  @Input({ required: true }) modalId = '';

  isDialogOpen: boolean = false;

  onClickModal() {
    const dialogElement = document.getElementById(this.modalId);
    if (dialogElement) {
      (dialogElement as HTMLDialogElement).showModal();
    }
  }
}
