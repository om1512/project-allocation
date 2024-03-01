import { Component, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../../service/profile.service';
import { GroupServiceService } from '../../service/group-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.css'
})
export class CreateGroupModalComponent {
  groupName: string = "";
  student: any;
  customErrorMessage: string = undefined;
  year: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cookieService: CookieService, private profileService: ProfileService, private groupService: GroupServiceService, private dialogRef: MatDialogRef<CreateGroupModalComponent>,
  ) { }

  async onCreate() {
    this.customErrorMessage = undefined;

    if (this.groupName === "") {
      this.customErrorMessage = 'Enter Group Name';
      return;
    }

    await this.getStoredCookie();
    this.year = new Date().getFullYear();

    this.groupService.createGroup({
      "groupName": this.groupName,
      "student": this.student,
      "year": this.year
    }).subscribe(
      (response) => {
        this.dialogRef.close({
          "status": true,
          "message": "Group created successfully!!!"
        });
      },
      (error) => {
        console.error('Error creating group', error);
        this.dialogRef.close({
          "status": false,
          "message": "Something went Wrong!!!"
        });
      }
    );
  }

  async getStoredCookie(): Promise<any> {
    const cookieValue = this.cookieService.get('Login-cred');

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      await this.loadProfile(parsedCookie.id);
    }
  }

  async loadProfile(uid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.profileService.getProfile(uid).subscribe(
        (data) => {
          this.student = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
