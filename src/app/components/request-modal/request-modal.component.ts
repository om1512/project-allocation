import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupServiceService } from '../../student/service/group-service.service';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.css'
})

export class RequestModalComponent implements OnInit {
  request: any[];
  Student: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupServiceService,
    private dialogRef: MatDialogRef<RequestModalComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    this.Student = this.data.student;
    await this.loadRequests();
  }

  async loadRequests(): Promise<void> {
    try {
      const data = await this.groupService.getStudentRequest(this.Student.id).toPromise();
      this.request = data.filter(item => item.status === "PENDING");
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }

  handleCloseModal(success: boolean): void {
    if (true) {
      var data;

      if(success) {
        data = {
          'action': true,
          'message': 'You join the group!'
        }
      } else {
        data = {
          'action': false,
          'message': 'You rejected the request'
        }
      }
      this.dialogRef.close(data);
    }
  }
}
