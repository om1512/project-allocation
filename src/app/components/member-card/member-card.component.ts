import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GroupServiceService } from '../../student/service/group-service.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() imageSrc: string = "../../../assets/profile-student.png";
  @Input() name: string;
  @Input() specialization: string = "Computer";
  @Input() rollNumber: string = undefined;

  constructor(

  ) { }
}
