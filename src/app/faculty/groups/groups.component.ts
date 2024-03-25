import { Component } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent {
  facultyData: any = {};
  constructor(private facultyService: FacultyService, private router: Router) {
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

  groupView() {
    window.location.href = '/faculty/groups/detail';
  }
}
