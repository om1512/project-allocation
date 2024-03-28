import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { GroupServiceService } from '../../student/service/group-service.service';
import { ProfileService } from '../../student/service/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { GroupComponent } from '../../student/group/group.component';


@Component({
  selector: 'app-horizontal-nav',
  templateUrl: './horizontal-nav.component.html',
  styleUrl: './horizontal-nav.component.css'
})
export class HorizontalNavComponent implements OnInit {
  requests: any[];
  Student: any;
  customErrorMessage: string;
  customSuccessMessage: string;

  constructor(
    private dailog: MatDialog,
    private groupService: GroupServiceService,
    private profileService: ProfileService,
    private cookieService: CookieService,
  ) { }

  async ngOnInit(): Promise<void> {

    await this.getStoredCookie();
    await this.loadRequests();
    console.log(this.requests);
  }

  openModal(): void {
    const dialogRef = this.dailog.open(RequestModalComponent, {
      width: '450px',
      height: '600px',
      position: {
        top: '85px',
        right: '20px'
      },
      data: {
        "requests": this.requests,
        "student": this.Student
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadRequests();

      if (result.action == true) {
        this.customSuccessMessage = result.message;
        setTimeout(() => {
          this.closeError();
        }, 4000);
      } else {
        this.customErrorMessage = result.message;
        setTimeout(() => {
          this.closeError();
        }, 4000);
      }
    });
  }

  async getStoredCookie(): Promise<any> {
    const cookieValue = this.cookieService.get('Login-cred');

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      await this.loadProfile(parsedCookie.id);
    }
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.Student = data;
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  async loadRequests(): Promise<void> {
    try {
      const data = await this.groupService.getStudentRequest(this.Student.id).toPromise();
      this.requests = data.filter(item => item.status === "PENDING" && !item.studentRequested);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }

  closeError() {
    this.customErrorMessage = undefined;
    this.customSuccessMessage = undefined;
  }
}
