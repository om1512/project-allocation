import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from '../../../service/toggle.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})
export class AdminNavComponent {
  @Output() stateChange = new EventEmitter<{
    homeActive: boolean;
  }>();

  homeActive = true;

  items = [
    {
      label: 'Add Students',
      icon: 'face',
      path: '/Dashboard',
      active: this.homeActive,
    },
  ];

  constructor(
    private router: Router,
    private toggleService: ToggleService,
    private stateService: AdminService
  ) {}

  isSidebarCollapsed = false;
  isToggleIconCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isToggleIconCollapsed = !this.isToggleIconCollapsed;
    this.toggleService.toggleSidebar();
  }

  handleNavItemClicked(index: number): void {
    if (index === 0) {
      this.homeActive = true;

      this.items = [
        {
          label: 'Add Students',
          icon: 'face',
          path: '/Dashboard',
          active: this.homeActive,
        },
      ];
    }

    this.stateService.updateState(this.homeActive);
  }

  onStateChange() {
    this.stateChange.emit({
      homeActive: this.homeActive,
    });
  }

  handleLogout(): void {
    this.router.navigate(['']);
  }
}
