import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupServiceService } from '../../service/group-service.service';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'app-group-requests-card',
  templateUrl: './group-requests-card.component.html',
  styleUrl: './group-requests-card.component.css'
})
export class GroupRequestsCardComponent {
  @Input() requestData: any;
  @Output() closeModal = new EventEmitter<boolean>();
  id: string = '';
  group_name: string = '';
  student_name: string = '';
  customErrorMessage: string = undefined;
  customSuccessMessage: string = undefined;

  constructor(
    private groupService: GroupServiceService,
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    console.log(this.requestData);
    this.id = this.requestData?.group.id || "";
    this.group_name = this.requestData.group.groupName;
  }

  async onAccept(): Promise<void> {
    if (this.requestData.group.studentList.length == 3) {
      this.customErrorMessage = "Group is full!";
      return;
    }

    setTimeout(() => {
      this.closeError();
    }, 4000);

    try {
      const data = await this.groupService.approveRequest(this.requestData).toPromise();
    } catch (error) {
      this.requestService.acceptRequest(this.requestData);
      this.emitCloseModal(true);
      console.log(error);
    }
  }

  async onReject(): Promise<void> {
    setTimeout(() => {
      this.closeError();
    }, 4000);

    try {
      const data = await this.groupService.rejectRequest(this.requestData).toPromise();
    } catch (error) {
      this.emitCloseModal(false);
      console.log(error);
    }
  }

  emitCloseModal(success: boolean): void {
    this.closeModal.emit(success);
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
}
