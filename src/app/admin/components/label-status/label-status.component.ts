import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-status',
  standalone: true,
  imports: [NgClass],
  templateUrl: './label-status.component.html',
  styleUrl: './label-status.component.scss',
})
export class LabelStatusComponent {
  @Input() customClass = '';
}
