import { Component, Input } from '@angular/core';

export type TData = {
  title: string;
  details: {
    detailTitle: string;
    detailDesc: string;
  }[];
};

@Component({
  selector: 'app-detail-info',
  standalone: true,
  imports: [],
  templateUrl: './detail-info.component.html',
  styleUrl: './detail-info.component.scss',
})
export class DetailInfoComponent {
  @Input() data: TData | null = null;
}
