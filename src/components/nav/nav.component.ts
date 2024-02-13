import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from '../../service/toggle.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  items = [
    { label: 'Home', icon: 'home', path: '/Home' },
    { label: 'Group', icon: 'group', path: '/Group' },
    { label: 'Project', icon: 'assessment', path: '/Project' },
  ]

  constructor(private router: Router, private toggleService: ToggleService) { }

  isSidebarCollapsed = false;
  isToggleIconCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isToggleIconCollapsed = !this.isToggleIconCollapsed;
    this.toggleService.toggleSidebar();
  }

  handleLogout(): void {
    this.router.navigate(['']);
  }
}
