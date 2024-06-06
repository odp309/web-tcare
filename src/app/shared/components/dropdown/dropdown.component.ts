import { Component, Input } from '@angular/core';
import { LucideAngularComponent, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ required: true }) text = '';

  isOpen: boolean = false;

  onClick() {
    this.isOpen = !this.isOpen;
  }
}
