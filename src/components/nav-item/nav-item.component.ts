import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input() navItems: any[];
  @Input() isSidebarCollapsed: boolean;

  constructor(private router: Router) { }

  onItemClick(path: string) {
    this.router.navigate([path]);
  }
}
