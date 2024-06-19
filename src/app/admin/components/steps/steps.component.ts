import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IResTrackStatus } from '../../../shared/types/ticketReport';
import { ToTitleCasePipe } from '../../../shared/pipes/to-title-case/to-title-case.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [ToTitleCasePipe, FormatDatePipe, NgClass],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent {
  @Input() stepsData: IResTrackStatus[] = [];
  @Input() numOfSteps: number = 0;
  descInfo: string[] = [
    'Kendala',
    'Diterima oleh',
    'Diproses oleh',
    'Selesai Diproses oleh',
    'Diterima oleh',
  ];

  // finalData: IResTrackStatus[] = [];

  // mappingFinalData() {
  //   for (let i = 0; i < this.numOfSteps; i++) {
  //     if (i <= this.stepsData.length - 1) {
  //       this.finalData.push(this.stepsData[i]);
  //       continue;
  //     }
  //     this.finalData.push(null);
  //   }
  // }

  // ngOnInit(): void {
  //   this.mappingFinalData();
  // }
}
