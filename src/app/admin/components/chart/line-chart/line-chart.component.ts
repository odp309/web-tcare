import { Component, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
  chart: any;
  @Input({ required: true }) idChart: string = '';
  @Input() labels: string[] = [];
  @Input() legendLabel: string = '';
  @Input() data: number[] = [];

  private createChart() {
    const data = {
      labels: this.labels,
      datasets: [
        {
          label: this.legendLabel,
          labels: this.labels,
          data: this.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    this.chart = new Chart(this.idChart, {
      type: 'line',
      data: data,
    });
  }

  private updateChartData() {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['labels'] || changes['data'])) {
      this.updateChartData();
      return;
    }
  }
}
