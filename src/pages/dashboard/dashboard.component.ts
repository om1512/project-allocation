import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() homeActive: boolean;
  @Input() groupActive: boolean;
  @Input() projectActive: boolean;

  isSidebarCollapsed: boolean;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    console.log('homeActive:', this.homeActive);
    console.log('groupActive:', this.groupActive);
    console.log('projectActive:', this.projectActive);

    this.toggleService.isSidebarCollapsed$.subscribe(isCollapsed => {
      this.isSidebarCollapsed = isCollapsed;
    });
  }

  updateState() {
    this.stateChange.emit({ homeActive: this.homeActive, groupActive: this.groupActive, projectActive: this.projectActive });
    this.logTrueValues();
  }

  private logTrueValues() {
    if (this.homeActive) {
      console.log('homeActive is true');
    }
    if (this.groupActive) {
      console.log('groupActive is true');
    }
    if (this.projectActive) {
      console.log('projectActive is true');
    }
  }
}
