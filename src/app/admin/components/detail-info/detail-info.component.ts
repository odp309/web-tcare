import { Component, Input } from '@angular/core';
import { TDataDetail } from '../../../shared/types/ticketReport';

@Component({
  selector: 'app-detail-info',
  standalone: true,
  imports: [],
  templateUrl: './detail-info.component.html',
  styleUrl: './detail-info.component.scss',
})
export class DetailInfoComponent {
  @Input() data: TDataDetail | null = null;
}
