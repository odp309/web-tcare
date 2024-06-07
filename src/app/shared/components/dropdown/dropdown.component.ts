import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';
import { ToTitleCasePipe } from '../../pipes/to-title-case/to-title-case.pipe';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgClass,
    ClickOutsideDirective,
    ToTitleCasePipe,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ required: true }) placeholder = '';
  @Input() size: 'small' | 'medium' = 'small';
  text = '';
  @Input({ required: true }) dropdownItems: string[] = [];

  isOpen: boolean = false;

  onClick() {
    this.isOpen = !this.isOpen;
  }
}
