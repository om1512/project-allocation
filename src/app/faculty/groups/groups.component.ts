import { Component } from '@angular/core';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent {
  facultyData: any = {};
  constructor(private facultyService: FacultyService) {
    this.getDataFromAPI();
  }
  selectedOption: string;

  getDataFromAPI() {
    this.facultyService
      .getData(localStorage.getItem('email'))
      .subscribe((data) => {
        this.facultyData = data;
        console.log(this.facultyData);
      });
  }
}
