import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  dashboard: boolean;
  addStudent: boolean;
  isSidebarCollapsed: boolean;
  path: string = ' /';
  tab: string = '';

  constructor(
    private toggleService: ToggleService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.toggleService.isSidebarCollapsed$.subscribe((isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });

    this.adminService._addStudents.subscribe((addStudent) => {
      this.addStudent = addStudent;
      console.log('A  ' + addStudent);
      this.path = 'Admin / Dashboard';
      this.tab = 'Add Students';
    });

    this.adminService._dashboard.subscribe((dashboard) => {
      this.dashboard = dashboard;
      console.log(dashboard);
      this.path = 'Admin /';
      this.tab = 'Dashboard';
    });
  }


}
