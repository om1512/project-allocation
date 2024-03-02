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
    phaseControl: boolean;
    communication: boolean;
  }>();

  @Output() dataEvent = new EventEmitter<any>();

  homeActive = false;
  dashboardActive = true;
  addFaculties = false;
  phaseControl = false;
  communication = false;
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
    {
      label: 'Phase Control',
      icon: 'view_carousel',
      active: this.phaseControl,
    },
    {
      label: 'Communication',
      icon: 'settings_input_antenna',
      active: this.communication,
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
      this.phaseControl = false;
      this.communication = false;

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
        {
          label: 'Phase Control',
          icon: 'view_carousel',
          active: this.phaseControl,
        },
        {
          label: 'Communication',
          icon: 'settings_input_antenna',
          active: this.communication,
        },
      ];

      const path = 'Admin /';
      const tab = 'Dashboard';
      this.dataEvent.emit({ path, tab });
    } else if (index == 1) {
      this.homeActive = true;
      this.dashboardActive = false;
      this.addFaculties = false;
      this.phaseControl = false;
      this.communication = false;

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
        {
          label: 'Phase Control',
          icon: 'view_carousel',
          active: this.phaseControl,
        },
        {
          label: 'Communication',
          icon: 'settings_input_antenna',
          active: this.communication,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Add Student';
      this.dataEvent.emit({ path, tab });
    } else if (index == 2) {
      this.homeActive = false;
      this.dashboardActive = false;
      this.addFaculties = true;
      this.phaseControl = false;
      this.communication = false;

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
        {
          label: 'Phase Control',
          icon: 'view_carousel',
          active: this.phaseControl,
        },
        {
          label: 'Communication',
          icon: 'settings_input_antenna',
          active: this.communication,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Manage Faculty';
      this.dataEvent.emit({ path, tab });
    } else if (index == 3) {
      this.homeActive = false;
      this.dashboardActive = false;
      this.addFaculties = false;
      this.phaseControl = true;
      this.communication = false;

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
        {
          label: 'Phase Control',
          icon: 'view_carousel',
          active: this.phaseControl,
        },
        {
          label: 'Communication',
          icon: 'settings_input_antenna',
          active: this.communication,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Manage Faculty';
      this.dataEvent.emit({ path, tab });
    } else if (index == 4) {
      this.homeActive = false;
      this.dashboardActive = false;
      this.addFaculties = false;
      this.phaseControl = false;
      this.communication = true;
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
        {
          label: 'Phase Control',
          icon: 'view_carousel',
          active: this.phaseControl,
        },
        {
          label: 'Communication',
          icon: 'settings_input_antenna',
          active: this.communication,
        },
      ];

      const path = 'Admin / Dashboard /';
      const tab = 'Manage Faculty';
      this.dataEvent.emit({ path, tab });
    }

    this.stateService.updateState(
      this.dashboardActive,
      this.homeActive,
      this.addFaculties,
      this.phaseControl,
      this.communication
    );
  }

  onStateChange() {
    this.stateChange.emit({
      dashboardActive: this.dashboardActive,
      homeActive: this.homeActive,
      addFaculties: this.addFaculties,
      phaseControl: this.phaseControl,
      communication: this.communication,
    });
  }

  handleLogout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
