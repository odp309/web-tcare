import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private router: Router) {}

  pathname = this.router.url;
}
