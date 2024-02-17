import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  homeActive: boolean;
  groupActive: boolean;
  projectActive: boolean;
  isSidebarCollapsed: boolean;

  constructor(
    private toggleService: ToggleService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.toggleService.isSidebarCollapsed$.subscribe((isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });

    this.stateService._homeActive.subscribe((homeActive) => {
      this.homeActive = homeActive;

      console.log(homeActive);
    });

    this.stateService._groupActive.subscribe((groupActive) => {
      this.groupActive = groupActive;

      console.log(groupActive);
    });

    this.stateService._projectActive.subscribe((projectActive) => {
      this.projectActive = projectActive;

      console.log(projectActive);
    });
  }
}
