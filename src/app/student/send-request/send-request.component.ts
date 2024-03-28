import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { GroupServiceService } from '../service/group-service.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent implements OnInit {
  @Input() Student: any;
  @Input() Group: any;
  displayedColumns: string[] = ['No', 'Roll No', 'Name', 'cpi', 'Action'];
  students: any[];
  filterStudents: any[];

  constructor(
    private profileService: ProfileService,
    private groupService: GroupServiceService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadAllStudents();
    await this.loadGroup();
    const groupStudents = this.Group.studentList.map(student => student.id);
    this.students = this.students.filter(student => !groupStudents.includes(student.id));
    this.filterStudents = [...this.students];
  }

  async loadAllStudents() {
    try {
      const data = await this.profileService.getAll().toPromise();
      this.students = data;
      this.filterStudents = data;
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  searchStudents(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterStudents = this.students;
      return;
    }

    const searchResults = this.students.filter(student =>
      student.name.toString().toLowerCase().includes(searchText) ||
      student.rollNumber.toString().toLowerCase().includes(searchText)
    );

    this.filterStudents = [...searchResults];
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.Student.group.id).toPromise();
      this.Group = data;
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  sendRequest(element: any): void {
    try {
      const data = this.groupService.sendRequest(element.id, this.Group.id).toPromise();
    } catch (error) {
      console.log("Error while sending the request : " + error);
    }
  }
}
