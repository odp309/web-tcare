import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { LucideAngularModule } from 'lucide-angular';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, LucideAngularModule, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
