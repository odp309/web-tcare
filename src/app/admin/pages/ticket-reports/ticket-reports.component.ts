import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';

@Component({
  selector: 'app-ticket-reports',
  standalone: true,
  imports: [LucideAngularModule, TableComponent, LabelStatusComponent],
  templateUrl: './ticket-reports.component.html',
  styleUrl: './ticket-reports.component.scss',
})
export class TicketReportsComponent {}
