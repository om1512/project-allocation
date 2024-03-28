import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../service/group-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { GroupFilterComponent } from '../group-filter/group-filter.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})

export class GroupsComponent implements OnInit {
  groups: any[];
  searchText: string = '';
  filteredGroups: any[];
  filter: string = 'name';
  @Input() Student: any;

  constructor(
    private groupService: GroupServiceService,
    private dailog: MatDialog,
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
        group.groupName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        group.studentList.some(student => student.rollNumber.toString().includes(this.searchText.toLowerCase()))
      );
    } else {
      this.filteredGroups = [...this.groups];
    }
  }

  async loadGroups() {
    try {
      const data = await this.groupService.getAllGroup().toPromise();
      console.log(data);
      this.groups = data;
    } catch (error) {
      console.log("Error while loading all groups: " + error);
    }
  }
}
