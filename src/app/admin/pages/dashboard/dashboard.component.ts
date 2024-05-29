import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from '../../../shared/components/table/table.component';
import { LabelStatusComponent } from '../../components/label-status/label-status.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent,
    LucideAngularModule,
    TableComponent,
    LabelStatusComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
