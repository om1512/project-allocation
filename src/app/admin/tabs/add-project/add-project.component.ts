import { Component } from '@angular/core';
import { ProjectService } from '../../../student/service/project.service';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  excelData: unknown[];

  constructor(
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
  ) { }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = () => {
      var facultyBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = facultyBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(facultyBook.Sheets[sheetNames[0]]);

      this.excelData.forEach((excelFaculty: any) => {

        let project: any = {
          name: excelFaculty.name,
          description: excelFaculty.description,
        };

        this.projectService.project(project).subscribe(
          (response) => {
            if (response.success) {
              console.log('Projects Saved Successfully.');
              this._snackBar.open('Data saved', 'Close', {
                duration: 3000, // Duration in milliseconds
                verticalPosition: 'top', // Position of the snackbar
              });
              return;
            } else {
              console.log('Error Occurred. Please Try Again.');
            }
          },
          (error) => {
            console.log('Error Occurred. Please Try Again.');
          }
        );
      });
    };
  }

}
