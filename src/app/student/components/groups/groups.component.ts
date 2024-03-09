import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../../service/group-service.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  groups: any[];

  constructor(
    private groupService: GroupServiceService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.groupService.getAllGroup().subscribe((data) => {
      console.log(data);
      this.groups = data;
    });
  }
}
