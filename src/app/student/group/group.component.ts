import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { GroupServiceService } from '../service/group-service.service';
import { ProfileService } from '../service/profile.service';
import { ProjectService } from '../service/project.service';
import { CustomProjectModalComponent } from '../components/custom-project-modal/custom-project-modal.component';
import { ConfirmLeaveComponent } from '../components/confirm-leave/confirm-leave.component';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  @Input() isInGroup: boolean = false;
  @Input() Student: any;
  isAdmin: boolean = false;
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
  projectChoices: any[];
  dataSource: any[];

  constructor(
    private dailog: MatDialog,
    private groupService: GroupServiceService,
    private profileService: ProfileService,
    private projectService: ProjectService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.Student.user.id);
    await this.loadGroup(this.Student.group.id);
    await this.loadProject();
    await this.loadProjectChoices();
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
        await this.loadGroup(this.Student.group.id);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async loadGroup(gid: string) {
    this.groupService.getGroup(gid).subscribe(
      (data) => {
        this.Group = data;
        console.log(this.Group);
        console.log(this.Student);
        this.isAdmin = (this.Group.student.id === this.Student.id);
        console.log(this.isAdmin + this.Group.student.id + this.Student.id);
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

        return data;
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

  async loadProjectChoices(): Promise<void> {
    try {
      console.log(this.Student.group.id);
      await this.projectService.getProjectChoice(this.Student.group.id).subscribe(
        (data) => {
          this.projectChoices = data;
          console.log(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addToProjectChoices(project: any): Promise<void> {
    console.log(this.projectChoices[0]);
    console.log(project);
    for (const item of this.projectChoices) {
      if (item.projects.id === project.id) {
        console.log(item.id + " " + project.id);
        this.customErrorMessage = "This project is already in your choices.";
        setTimeout(() => {
          this.closeError();
        }, 4000);
        return;
      }
    }
    try {
      await this.projectService.saveProjectChoice(this.Student.group.id, this.Student.id, project.id).toPromise();
    } catch (error) {
      await this.loadProjectChoices();
      console.log("Error while adding project : " + error);
      this.customErrorMessage = "Project added in your choices";
      setTimeout(() => {
        this.closeError();
      }, 4000);
    }
  }

  async removeFromProjectChoices(element: any): Promise<void> {
    try {
      await this.projectService.removeProjectChoice(element.projects.id, element.group.id).toPromise();
    } catch (error) {
      await this.loadProjectChoices();
      console.error("Error removing project choice:", error);
    }
  }

  async leaveGroup(): Promise<void> {
    const dialogRef = this.dailog.open(ConfirmLeaveComponent, {
      width: '400px',
      height: '180px',
      disableClose: true,
      data: {
        "student": this.Student,
        "group": this.Group
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.closeError();
      }, 4000);

      this.isInGroup = result
    });
  }

  async onMemberRemoved(): Promise<void> {
    await this.refreshGroupAfterRemoval();
  }

  async refreshGroupAfterRemoval(): Promise<void> {
    await this.loadGroup(this.Student.group.id);
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
}
