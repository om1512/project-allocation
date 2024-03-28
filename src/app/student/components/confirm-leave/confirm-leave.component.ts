import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupServiceService } from '../../service/group-service.service';

@Component({
  selector: 'app-confirm-leave',
  templateUrl: './confirm-leave.component.html',
  styleUrl: './confirm-leave.component.css'
})
export class ConfirmLeaveComponent implements OnInit {
  Student: any;
  Group: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmLeaveComponent>,
    private groupService: GroupServiceService,
  ) { }

  ngOnInit(): void {
    this.Student = this.data.student;
    this.Group = this.data.group;
  }

  async leave(): Promise<void> {
    try {
      await this.groupService.leaveGroup(this.Student.id, this.Group.id).toPromise();
    } catch (error) {
      this.dialogRef.close(false);
    }
  }
}
