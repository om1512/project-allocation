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
    dashboardActive: boolean;
    homeActive: boolean;
  }>();

  homeActive = false;
  dashboardActive = true;

  items = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      active: this.dashboardActive,
    },
    {
      label: 'Add Students',
      icon: 'face',
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
      this.dashboardActive = true;
      this.homeActive = false;
      this.items = [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          active: this.dashboardActive,
        },
        {
          label: 'Add Students',
          icon: 'face',
          active: this.homeActive,
        },
      ];
    } else if (index == 1) {
      this.homeActive = true;
      this.dashboardActive = false;
      this.items = [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          active: this.dashboardActive,
        },
        {
          label: 'Add Students',
          icon: 'face',
          active: this.homeActive,
        },
      ];
    }

    this.stateService.updateState(this.dashboardActive, this.homeActive);
  }

  onStateChange() {
    this.stateChange.emit({
      dashboardActive: this.dashboardActive,
      homeActive: this.homeActive,
    });
  }

  handleLogout(): void {
    this.router.navigate(['']);
  }
}
