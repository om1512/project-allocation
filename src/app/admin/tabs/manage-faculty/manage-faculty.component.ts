import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FacultyPopupComponent } from '../../components/faculty-popup/faculty-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-faculty',
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css',
})
export class ManageFacultyComponent implements OnInit {
  year: number = 2024;
  faculties = [];
  availableFaculties = [];
  unAvailableFaculties = [];
  constructor(public adminService: AdminService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.adminService.getAllFaculties().subscribe((data) => {
      this.faculties = data;
      this.getAvailableFaculties(this.faculties);
    });
  }

  removeFromAvailable(data: any) {
    this.adminService.saveFaculty(data.faculty).subscribe(
      (response) => {
        if (response.success) {
          this.availableFaculties.splice(data.index, 1);
          this.unAvailableFaculties.push(data.faculty);
        } else {
          console.log('not success');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailableFaculties(faculty: any[]) {
    faculty.forEach((f) => {
      if (f.available === true) {
        this.availableFaculties.push(f);
      } else {
        this.unAvailableFaculties.push(f);
      }
    });
  }

  addFaculties() {
    this.openPopup();
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(FacultyPopupComponent, {
      width: '400px', // Set the width of the popup
      data: {
        f: this.unAvailableFaculties,
        callback: this.callbackMethod.bind(this),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  callbackMethod(event: any): void {
    this.availableFaculties.push(event);
  }
}
