import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../student/service/group-service.service';
import { ProfileService } from '../../student/service/profile.service';

@Component({
  selector: 'app-add-member-card',
  templateUrl: './add-member-card.component.html',
  styleUrl: './add-member-card.component.css'
})
export class AddMemberCardComponent implements OnInit {
  @Input() name: string;
  @Input() id: string;
  @Input() Student: any;
  @Input() senderId: any;
  customErrorMessage: string = undefined;
  Group: any;
  error: boolean = false;

  constructor(
    private groupService: GroupServiceService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.loadProfile(this.Student.user.id);
    this.loadGroup(this.senderId.group.id);
  }

  async sendRequest() {
    setTimeout(() => {
      this.closeError();
    }, 4000);

    if (this.Group.studentList.length == 3) {
      this.error = true;
      this.customErrorMessage = "Group is full!";
      return;
    }

    try {
      const result = await this.groupService.sendRequest({
        "student": this.Student,
        "sender": this.senderId
      }).toPromise();

    } catch (error) {
      error = false;
      this.customErrorMessage = 'Request Send!';
      setTimeout(() => {
        this.closeError();
      }, 4000);
    }
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.Student = data;
    } catch (error) {
      console.log(error);
    }
  }

  async loadGroup(gid: string) {
    this.groupService.getGroup(gid).subscribe(
      (data) => {
        this.Group = data;
      }
    );
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
}
