import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../service/group-service.service';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent implements OnInit {
  @Input() group: any;
  @Input() Student: any;
  studentList: any[];
  customErrorMessage: string = undefined;
  customSuccessMessage: string = undefined;
  constructor(
    private groupService: GroupServiceService,
  ) { }

  ngOnInit(): void {
    this.studentList = this.group.studentList;
  }

  async sendRequest(): Promise<void> {
    console.log(this.group);
    if (this.group.studentList.length === 3) {
      this.customErrorMessage = "Group is full!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
    try {
      await this.groupService.sendRequestByStudent({
        student: this.Student,
        sender: {
          group: {
            id: this.group.id
          }
        }
      }).toPromise();
    } catch (error) {
      setTimeout(() => {
        this.closeError();
      }, 4000);
      this.customSuccessMessage = "Request send!";
    }
  }

  closeError() {
    this.customErrorMessage = undefined;
    this.customSuccessMessage = undefined;
  }
}
