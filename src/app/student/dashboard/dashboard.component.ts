import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';
import { StateService } from '../service/state.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../service/profile.service';


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
  profileId: string;
  profileEmail: string;
  isInGroup: boolean = false;
  Student: any;

  constructor(
    private toggleService: ToggleService,
    private stateService: StateService,
    private cookieService: CookieService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.homeActive = true;

    this.toggleService.isSidebarCollapsed$.subscribe((isCollapsed) => {
      this.isSidebarCollapsed = isCollapsed;
    });

    this.stateService._homeActive.subscribe((homeActive) => {
      this.homeActive = homeActive;
    });

    this.stateService._groupActive.subscribe((groupActive) => {
      this.groupActive = groupActive;
    });

    this.stateService._projectActive.subscribe((projectActive) => {
      this.projectActive = projectActive;
    });

    this.getStoredCookie();
  }

  getStoredCookie(): any {
    const cookieValue = this.cookieService.get('Login-cred');

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      this.profileId = parsedCookie.id;
      this.profileEmail = parsedCookie.email;
      this.loadProfile(this.profileId);
    }
  }

  async loadProfile(uid: string): Promise<void> {
    this.profileService.getProfile(uid).subscribe(
      (data) => {
        this.Student = data;

        if (data.group.id != null || data.group.id != undefined, data.group.id != '') {
          this.isInGroup = true;
        }
      }
    );
  }
}
