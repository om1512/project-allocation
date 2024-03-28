import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupServiceService } from '../../service/group-service.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrl: './group-modal.component.css'
})
export class GroupModalComponent {
  @Input() group: any;
  request: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupServiceService,
    private dialogRef: MatDialogRef<GroupModalComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadRequests();
  }

  async loadRequests(): Promise<void> {
    try {
      console.log(this.data)
      const data = await this.groupService.getGroupRequest(this.data.id).toPromise();
      this.request = data.filter(item => item.status === "PENDING" && !item.studentRequested);
      console.log(this.request);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }

  handleCloseModal(success: boolean): void {

    if (true) {
      var data;

      if (success) {
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
