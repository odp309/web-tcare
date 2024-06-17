import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IResTrackStatus } from '../../../shared/types/ticketReport';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [ToTitleCasePipe, FormatDatePipe],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent implements OnInit  {
  @Input() stepsData: IResTrackStatus[] = [];
  @Input() numOfSteps: number = 0;

  finalData: IResTrackStatus[] = [];

  mappingFinalData() {
    for (let i = 0; i < this.numOfSteps; i++) {
      if (i <= this.stepsData.length - 1) {
        this.finalData.push(this.stepsData[i]);
        continue;
      }
      this.finalData.push(null);
    }
  }

  ngOnInit(): void {
    this.mappingFinalData();
  }
}
