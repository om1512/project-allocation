import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from '../../../service/toggle.service';
import { AdminService } from '../../service/admin.service';
import { LoginServiceService } from '../../../authentication/service/login-service.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})
export class AdminNavComponent {
  @Output() stateChange = new EventEmitter<{
    dashboardActive: boolean;
    homeActive: boolean;
    addFaculties: boolean;
  }>();

  @Output() dataEvent = new EventEmitter<any>();

  homeActive = false;
  dashboardActive = true;
  addFaculties = false;
  items = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      active: this.dashboardActive,
    },
    {
      label: 'Add Users',
      icon: 'supervisor_account',
      active: this.homeActive,
    },
    {
      label: 'Manage Faculty',
      icon: 'donut_small',
      active: this.addFaculties,
    },
  ];

  constructor(
    private router: Router,
    private toggleService: ToggleService,
    private stateService: AdminService,
    private loginService: LoginServiceService
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
      this.addFaculties = false;
      this.items = [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          active: this.dashboardActive,
        },
        {
          label: 'Add Users',
          icon: 'supervisor_account',
          active: this.homeActive,
        },
        {
          label: 'Manage Faculty',
          icon: 'donut_small',
          active: this.addFaculties,
        },
      ];

      const path = 'Admin /';
      const tab = 'Dashboard';
      this.dataEvent.emit({ path, tab });
    } else if (index == 1) {
      this.homeActive = true;
      this.dashboardActive = false;
      this.addFaculties = false;
      this.items = [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          active: this.dashboardActive,
        },
        {
          label: 'Add Users',
          icon: 'supervisor_account',
          active: this.homeActive,
        },
        {
          label: 'Manage Faculty',
          icon: 'donut_small',
          active: this.addFaculties,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Add Student';
      this.dataEvent.emit({ path, tab });
    } else if (index == 2) {
      this.homeActive = false;
      this.dashboardActive = false;
      this.addFaculties = true;
      this.items = [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          active: this.dashboardActive,
        },
        {
          label: 'Add Users',
          icon: 'supervisor_account',
          active: this.homeActive,
        },
        {
          label: 'Manage Faculty',
          icon: 'donut_small',
          active: this.addFaculties,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Manage Faculty';
      this.dataEvent.emit({ path, tab });
    }

    this.stateService.updateState(
      this.dashboardActive,
      this.homeActive,
      this.addFaculties
    );
  }

  onStateChange() {
    this.stateChange.emit({
      dashboardActive: this.dashboardActive,
      homeActive: this.homeActive,
      addFaculties: this.addFaculties,
    });
  }

  handleLogout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
