import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent implements OnInit {
  constructor(private router: Router) {}
  title: string = '';

  ngOnInit(): void {
    if (this.router.url.includes('dashboard')) {
      this.title = 'Dashboard';
    }
  }
}
