import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css',
})
export class CommunicationComponent implements OnInit {
  allStudents: any[] = [];
  selectedStudents: boolean[] = [];

  // allFaculty: any[] = [];
  constructor(private adminService: AdminService) {
    this.allStudents.forEach(() => this.selectedStudents.push(false));
  }
  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe((data) => {
      this.allStudents = data;
    });
    // this.adminService.getAllFaculties().subscribe((data) => {
    //   this.allFaculty = data;
    // });
  }
  type: number;
  selectedTab: string = 'tab1';
  mainTypeClick(type: number) {
    this.type = type;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleSelection(index: number) {
    this.selectedStudents[index] = !this.selectedStudents[index];
  }
}
