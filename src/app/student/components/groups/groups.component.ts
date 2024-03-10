import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../service/group-service.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  groups: any[];
  searchText: string = '';
  filteredGroups: any[];
  @Input() Student: any;

  constructor(
    private groupService: GroupServiceService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.groupService.getAllGroup().subscribe((data) => {
      console.log(data);
      this.groups = data;
      this.filteredGroups = [...this.groups];
    });
  }

  onSearch(): void {
    if (this.searchText.trim() !== '') {
      this.filteredGroups = this.groups.filter(group =>
        group.groupName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredGroups = [...this.groups];
    }
  }
}
