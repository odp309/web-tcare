import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent {
  chart!: Chart<'doughnut', number[], string>;
  @Input({ required: true }) idChart: string = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  private createChart() {
    this.chart = new Chart(this.idChart, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Amount',
            data: this.data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4,
          },
        ],
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
