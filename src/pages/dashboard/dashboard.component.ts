import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed: boolean;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleService.isSidebarCollapsed$.subscribe(isCollapsed => {
      this.isSidebarCollapsed = isCollapsed;
    });
  }
}
