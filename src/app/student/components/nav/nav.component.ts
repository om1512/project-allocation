import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from '../../../service/toggle.service';
import { StateService } from '../../service/state.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Output() stateChange = new EventEmitter<{
    homeActive: boolean;
    groupActive: boolean;
    projectActive: boolean;
    groupsActive: boolean;
  }>();

  homeActive = true;
  groupActive = false;
  projectActive = false;
  groupsActive = false;

  items = [
    {
      label: 'Home',
      icon: 'home',
      path: '/Dashboard',
      active: this.homeActive,
    },
    {
      label: 'Group',
      icon: 'group',
      path: '/Dashboard',
      active: this.groupActive,
    },
    {
      label: 'Project',
      icon: 'assessment',
      path: '/Dashboard',
      active: this.projectActive,
    },
    {
      label: 'Groups',
      icon: 'group',
      path: '/Dashboard',
      active: this.groupsActive,
    }
  ];

  constructor(
    private router: Router,
    private toggleService: ToggleService,
    private stateService: StateService,
    private cookieService: CookieService,
  ) { }

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
      this.groupActive = false;
      this.projectActive = false;
      this.groupsActive = false;

      this.items = [
        {
          label: 'Home',
          icon: 'home',
          path: '/Dashboard',
          active: this.homeActive,
        },
        {
          label: 'Group',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupActive,
        },
        {
          label: 'Project',
          icon: 'assessment',
          path: '/Dashboard',
          active: this.projectActive,
        },
        {
          label: 'Groups',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupsActive,
        }
      ];
    } else if (index == 1) {
      this.homeActive = false;
      this.groupActive = true;
      this.projectActive = false;
      this.groupsActive = false

      this.items = [
        {
          label: 'Home',
          icon: 'home',
          path: '/Dashboard',
          active: this.homeActive,
        },
        {
          label: 'Group',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupActive,
        },
        {
          label: 'Project',
          icon: 'assessment',
          path: '/Dashboard',
          active: this.projectActive,
        },
        {
          label: 'Groups',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupsActive,
        }
      ];
    } else if (index == 2) {
      this.homeActive = false;
      this.groupActive = false;
      this.projectActive = true;
      this.groupsActive = false;

      this.items = [
        {
          label: 'Home',
          icon: 'home',
          path: '/Dashboard',
          active: this.homeActive,
        },
        {
          label: 'Group',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupActive,
        },
        {
          label: 'Project',
          icon: 'assessment',
          path: '/Dashboard',
          active: this.projectActive,
        },
        {
          label: 'Groups',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupsActive,
        }
      ];
    } else {
      this.homeActive = false;
      this.groupActive = false;
      this.projectActive = false;
      this.groupsActive = true;

      this.items = [
        {
          label: 'Home',
          icon: 'home',
          path: '/Dashboard',
          active: this.homeActive,
        },
        {
          label: 'Group',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupActive,
        },
        {
          label: 'Project',
          icon: 'assessment',
          path: '/Dashboard',
          active: this.projectActive,
        },
        {
          label: 'Groups',
          icon: 'group',
          path: '/Dashboard',
          active: this.groupsActive,
        }
      ];
    }

    this.stateService.updateState(
      this.homeActive,
      this.groupActive,
      this.projectActive,
      this.groupsActive
    );
  }

  onStateChange() {
    this.stateChange.emit({
      homeActive: this.homeActive,
      groupActive: this.groupActive,
      projectActive: this.projectActive,
      groupsActive: this.groupsActive
    });
  }

  handleLogout(): void {
    this.cookieService.delete('Login-cred');
    this.router.navigate(['']);
  }
}
