import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { GroupServiceService } from '../service/group-service.service';
import { ProfileService } from '../service/profile.service';
import { ProjectService } from '../service/project.service';
import { CustomProjectModalComponent } from '../components/custom-project-modal/custom-project-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  @Input() isInGroup: boolean = false;
  @Input() Student: any;
  customErrorMessage: string = undefined;
  success: boolean = false;
  fail: boolean = false;
  displayedColumns: string[] = ['no', 'project_id', 'name', 'actions'];
  group_id: string;
  group_name: string;
  rank: string;
  guide: string;
  allocated_project: string;
  students: any[];
  Group: any;
  members: any[];
  tempProjects: any[];
  dataSource: any[];

  constructor(
    private dailog: MatDialog,
    private groupService: GroupServiceService,
    private profileService: ProfileService,
    private projectService: ProjectService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.Student.user.id);
    await this.loadProject();
  }

  openModal(): void {
    const dialogRef = this.dailog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      setTimeout(() => {
        this.closeError();
      }, 7000);

      this.isInGroup = result.status;
      this.customErrorMessage = result.message;
      this.Student = result.student;

      console.log(this.Student);

      if (this.isInGroup) {
        await this.loadProject();
        await this.loadGroup(this.Student.group.id);
        this.members = this.Group.studentList;
      }
    });
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.Student = data;

      if (this.Student.group != null) {
        this.isInGroup = true;
        this.loadGroup(this.Student.group.id);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async loadGroup(gid: string) {
    this.groupService.getGroup(gid).subscribe(
      (data) => {
        this.Group = data;
        this.members = this.Group.studentList;
        this.loadStudents();

        this.group_id = this.Student.group.id;
        this.group_name = this.Student.group.groupName;
        this.rank = this.Student.group.rank;
        this.allocated_project = this.Student.group.project;

        if (this.rank == '0') {
          this.rank = '-';
        }

        if (this.allocated_project == null) {
          this.allocated_project = '-';
        }
      }
    );
  }

  async loadStudents() {
    this.profileService.getAll().subscribe(
      (data) => {
        if (this.members && this.members.length > 0) {
          this.students = data.filter(student => !this.members.some(member => member.id === student.id));
        }
      }
    );
  }

  async loadProject(): Promise<void> {
    this.projectService.getAll().subscribe(
      (data) => {
        this.dataSource = data;
        this.tempProjects = data;
      }
    );
  }

  filterDataSource(): void {
    if (!this.tempProjects || !this.members) {
      return;
    }

    const memberIds = this.members.map(member => member.id);
    this.dataSource = this.tempProjects.filter(project => !memberIds.includes(project.id));
  }

  searchProjects(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.dataSource = this.tempProjects;
      return;
    }

    const searchResults = this.dataSource.filter(project =>
      project.name.toString().toLowerCase().includes(searchText)
    );

    if (searchResults.length > 0) {
      this.dataSource = [
        ...searchResults,
      ];
    }
  }

  openCustomProjectModal(): void {
    const dialogRef = this.dailog.open(CustomProjectModalComponent, {
      width: '400px',
      height: '330px',
      data: this.group_id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.closeError();
      }, 4000);

      this.isInGroup = result.status;
      this.customErrorMessage = result.message;

      this.loadProject();
    });
  }

  async leaveGroup(): Promise<void> {
    try {
      const result = await this.groupService.leaveGroup({
        student_id: this.Student.id,
        group_id: this.Group.id,
      }).toPromise();

      console.log('Success:', result);

      this.isInGroup = false;
      await this.loadProfile(this.Student.user.id);
      console.log(this.Student);
    } catch (error) {
      this.isInGroup = false;
      await this.loadProfile(this.Student.user.id);
      console.error('Error:', error);
    }
  }


  closeError() {
    console.log(this.customErrorMessage);
    this.customErrorMessage = undefined;
  }
}
