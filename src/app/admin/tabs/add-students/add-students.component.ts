import * as XLSX from 'xlsx';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student } from '../../interface/student';
import { User } from '../../interface/user';
import { AdminService } from '../../service/admin.service';
import { Result } from '../../interface/result';
@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css',
})
export class AddStudentsComponent {
  studentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    rollNumber: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  excelData: unknown[];
  constructor(
    private _snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  getStudentObject(): Student {
    const user: User = {
      email: this.studentForm.get('email').value,
      password: this.studentForm.get('password').value,
      type: 'student',
    };
    const student: Student = {
      name: this.studentForm.get('name').value,
      studentId: this.studentForm.get('studentId').value,
      rollNumber: Number(this.studentForm.get('rollNumber').value),
      year: new Date(this.studentForm.get('year').value),
      phone: this.studentForm.get('phone').value,
      user: user,
      resultList: [],
    };
    return student;
  }

  saveData() {
    let isEmpty = false;
    let passwordsMatch = true;
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      if (control && control.value === '') {
        isEmpty = true;
        this._snackBar.open('One or more fields are empty', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'top', // Position of the snackbar
        });
      }
    });

    const password = this.studentForm.get('password').value;
    const confirmPassword = this.studentForm.get('confirmPassword').value;
    if (password !== confirmPassword) {
      passwordsMatch = false;
      this._snackBar.open('Passwords do not match', 'Close', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top', // Position of the snackbar
      });
    }

    if (isEmpty) {
      console.log('One or more fields are empty');
    } else if (!passwordsMatch) {
      console.log('Passwords do not match');
    } else {
      let student: Student = this.getStudentObject();
      this.adminService.saveStudent(student).subscribe((success) => {
        if (success) {
          this._snackBar.open('Data Saved Successfully.', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
          });
          this.studentForm.reset();
        } else {
          this._snackBar.open('Error Occur Please Try Again.', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
          });
        }
      });
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = () => {
      var facultyBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = facultyBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(facultyBook.Sheets[sheetNames[0]]);
      const currentYear = new Date();

      this.excelData.forEach((excelStudent: any) => {
        if (!this.validateEmail(excelStudent.email)) {
          console.log('Invalid email format for student: ' + excelStudent.name);
          this._snackBar.open('Invalid Email Format For Records!' + excelStudent.name, 'Close', {
            duration: 4000,
            verticalPosition: 'top'
          });
          return;
        }

        let student: Student = {
          name: excelStudent.name,
          rollNumber: excelStudent.rollNumber,
          phone: excelStudent.phone,
          user: {
            email: excelStudent.email,
            password: excelStudent.password,
            type: 'student',
          },
          studentId: excelStudent.studentId,
          year: currentYear,
          resultList: []
        };

        this.adminService.saveStudent(student).subscribe(
          (response) => {
            if (response) {
              console.log('Data Saved Successfully.');
              this._snackBar.open('Data saved', 'Close', {
                duration: 4000,
                verticalPosition: 'top'
              });
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

  readExcelResult(event: any) {
    console.log("called");
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = () => {
      var facultyBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = facultyBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(facultyBook.Sheets[sheetNames[0]]);
      console.log(this.excelData);

      this.excelData.forEach((excelResult: any) => {
        let result: Result = {
          cpi: excelResult.cpi,
          spi: excelResult.spi,
          semNo: excelResult.semNo,
        };
        console.log("called 2");
        this.adminService.saveResult(excelResult.studentId, result).subscribe(
          (response) => {
            if (response) {
              console.log('Data Saved Successfully.');
              this._snackBar.open('Data saved', 'Close', {
                duration: 4000,
                verticalPosition: 'top'
              });
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
