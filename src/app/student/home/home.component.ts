import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../components/profile-modal/profile-modal.component';
import { FlowModalComponent } from '../components/flow-modal/flow-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() profileId: string;
  @Input() profileEmail: string;
  profileImage = "../../../assets/profile-student.png";
  department = "Computer";
  profileName: string;
  studentId: string;
  resultList: any[];
  phoneNo: string;
  semester: string;
  cpi: string;
  students: any[];
  dataSource: any[];

  constructor(
    private profileService: ProfileService,
    private dailog: MatDialog
  ) { }

  displayedColumns: string[] = ['no', 'student_id', 'name', 'email', 'cpi'];

  ngOnInit(): void {
    this.loadProfile(this.profileId);
    this.loadStudents();
    this.openFlowModal();
  }

  async loadProfile(uid: string): Promise<void> {
    this.profileService.getProfile(uid).subscribe(
      (data) => {
        this.studentId = data.rollNumber;
        this.profileName = data.name;
        this.phoneNo = '(+91) ' + data.phone;
        this.resultList = data.resultList;

        if (!this.resultList || this.resultList.length === 0) {
          this.semester = '-';
          this.cpi = '-';
        } else {
          const lastIndex = this.resultList.length - 1;
          this.semester = this.resultList[lastIndex].semNo;
          this.cpi = this.resultList[lastIndex].cpi;
        }
      }
    );
  }

  async loadStudents(): Promise<void> {
    this.profileService.getAll().subscribe(
      (data) => {
        this.students = data;
        this.dataSource = this.students;
      }
    );
  }

  openModal(rowData: any): void {
    const dialogRef = this.dailog.open(ProfileModalComponent, {
      width: '500px',
      data: rowData,
    });

    dialogRef.afterClosed().subscribe(() => { });
  }

  openFlowModal(): void {
    const dailogRef = this.dailog.open(FlowModalComponent, {
      width: '500px',
      height: '700px'
    });

    dailogRef.afterClosed().subscribe(() => { });
  }
}
