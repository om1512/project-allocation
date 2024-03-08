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
  addFaculties: boolean;
  phaseControl: boolean;
  communication: boolean;
  studentView: boolean;
  isSidebarCollapsed: boolean;
  path: string = 'Admin /';
  tab: string = 'Dashboard';
  student: any = {};
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
      this.studentView = false;
    });

    this.adminService._dashboard.subscribe((dashboard) => {
      this.dashboard = dashboard;
      this.studentView = false;
    });

    this.adminService._addFaculties.subscribe((addFaculties) => {
      this.addFaculties = addFaculties;
      this.studentView = false;
    });

    this.adminService._phaseControl.subscribe((phaseControl) => {
      this.phaseControl = phaseControl;
      this.studentView = false;
    });

    this.adminService._communication.subscribe((communication) => {
      this.communication = communication;
      this.studentView = false;
    });
  }

  receiveData(data: any) {
    this.path = data.path;
    this.tab = data.tab;
  }
  receiveDataFromDashboard(data: any) {
    console.log('data : ' + data.p + ' ' + data.t);
    this.path = data.p;
    this.tab = data.t;
    this.studentView = data.studentStatus;
    this.dashboard = false;
    this.addStudent = false;
    this.student = data.s;
  }
  pathClick() {
    if (
      this.path == 'Admin / Dashboard / Student /' ||
      this.path == 'Admin /'
    ) {
      this.studentView = false;
      this.dashboard = true;
      this.addStudent = false;
    }
  }
  collapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: any): void {
    this.screenWidth = data.screenWidth;
    this.collapsed = data.collapsed;
  } 
}
