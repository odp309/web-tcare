import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  chart!: Chart;

  @Input({ required: true }) idChart: string = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  private createChart() {
    this.chart = new Chart(this.idChart, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Jumlah Tiket',
            data: this.data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
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
