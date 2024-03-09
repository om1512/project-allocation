import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroupServiceService } from '../../student/service/group-service.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() groupAdmin: boolean = false;
  @Input() imageSrc: string = "../../../assets/profile-student.png";
  @Input() name: string;
  @Input() specialization: string = "Computer";
  @Input() Student: any
  @Output() memberRemoved: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private groupService: GroupServiceService,
  ) { }

  async removeMember(): Promise<void> {
    try {
      await this.groupService.removeMember(this.Student.id, this.Student.group.id).toPromise();
    } catch(error) {
      this.memberRemoved.emit();
      console.log(error);
    }
  }
}
