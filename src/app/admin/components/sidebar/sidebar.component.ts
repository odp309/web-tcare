import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    ModalComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  onHandleLogout() {
    this.authService.logout();
  }
}
