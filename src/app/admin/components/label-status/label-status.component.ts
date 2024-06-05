import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-label-status',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './label-status.component.html',
  styleUrl: './label-status.component.scss',
})
export class LabelStatusComponent implements OnInit {
  customClass = '';
  @Input() status = '';

  checkStatus() {
    switch (this.status.toLowerCase()) {
      case 'diajukan':
        this.customClass = 'bg-blueBgStatus text-blueStatus';
        break;
      case 'dalam proses':
        this.customClass = 'bg-orangeBgStatus text-orangeStatus';
        break;
      case 'selesai':
        this.customClass = 'bg-greenBgStatus text-greenStatus';
        break;
    }
  }

  ngOnInit(): void {
    this.checkStatus();
  }

  ngOnChanges(): void {
    this.checkStatus();
  }
}
