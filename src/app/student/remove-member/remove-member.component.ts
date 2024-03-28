import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrl: './remove-member.component.css'
})
export class RemoveMemberComponent implements OnInit {
  @Input() Student: any;
  Group: any;
  groupMembers: any[];
  displayedColumns: string[] = ['No', 'Roll No', 'Name', 'cpi', 'Action'];

  constructor(
    private groupService: GroupServiceService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadGroup();
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.Student.group.id).toPromise();
      this.Group = data;
      this.groupMembers = this.Group.studentList.filter(member => member.id != this.Student.id);
      console.log(this.groupMembers);
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  async removeMember(element: any) {
    try {
      await this.groupService.leaveGroup(element.id, this.Group.id).toPromise();
      this.loadGroup();
    } catch (error) {
      this.loadGroup();
      console.log("Error while removing from the group : " + error);
    }
  }
}
