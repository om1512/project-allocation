import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input() navItems: any[];
  @Input() isSidebarCollapsed: boolean;
  @Output() itemClicked = new EventEmitter<number>();

  constructor(private router: Router) { }

  onItemClick(index: number, path: string) {
    this.itemClicked.emit(index);
    this.router.navigate([path]);
  }
}
