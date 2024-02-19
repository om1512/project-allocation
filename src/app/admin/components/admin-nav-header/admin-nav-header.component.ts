import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-nav-header',
  templateUrl: './admin-nav-header.component.html',
  styleUrl: './admin-nav-header.component.css',
})
export class AdminNavHeaderComponent {
  @Input() path: string = '';
  @Input() currentComponent = '';
}
