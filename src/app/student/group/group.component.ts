import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { GroupServiceService } from '../service/group-service.service';
import { ProfileService } from '../service/profile.service';
import { ProjectService } from '../service/project.service';
import { CustomProjectModalComponent } from '../components/custom-project-modal/custom-project-modal.component';
import { ConfirmLeaveComponent } from '../components/confirm-leave/confirm-leave.component';
import { RequestService } from '../service/request.service';
import { Subscription } from 'rxjs';
import { FacultyService } from '../service/faculty.service';
import { GroupModalComponent } from '../components/group-modal/group-modal.component';

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
  customSuccessMessage: string = undefined;
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
  facultyChoices: any[];
  dataSource: any[];
  faculties: any[];
  tempFaculty: any[];
  acceptRequestSubscription: Subscription;


  constructor(
    private dailog: MatDialog,
    private groupService: GroupServiceService,
    private profileService: ProfileService,
    private projectService: ProjectService,
    private requestService: RequestService,
    private facultyService: FacultyService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.Student.user.id);
    await this.loadGroup(this.Student.group.id);
    await this.loadProject();
    await this.loadProjectChoices();
    await this.loadFaculties();
    await this.loadFacultyChoices();

    this.acceptRequestSubscription = this.requestService.getAcceptRequestObservable()
      .subscribe(async (requestData: any) => {
        await this.loadGroup(this.Student.group.id);
        setTimeout(() => {
          this.closeError();
        }, 4000);
      });
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
      this.customSuccessMessage = result.message;
      this.Student = result.student;

      console.log(this.Student);

      await this.loadGroup(this.Student.group.id);
      if (this.isInGroup) {
        await this.loadProject();
        await this.loadFaculties();
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
        this.isAdmin = (this.Group.student.id === this.Student.id);
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
      await this.projectService.getProjectChoice(this.Student.group.id).toPromise()
        .then((data) => {
          this.projectChoices = data.sort((a, b) => a.priority - b.priority);
          console.log(this.projectChoices);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async loadFaculties(): Promise<void> {
    await this.facultyService.getAllFaculties().subscribe(
      (data) => {
        console.log(data);
        this.faculties = data;
        this.tempFaculty = data;
      }
    );
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
      this.customSuccessMessage = "Project added in your choices";
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

  async moveUp(index: number, element: any) {
    if (index === 0) {
      this.customErrorMessage = "Cannot decrement priority.";
      setTimeout(() => {
        this.customErrorMessage = undefined;
      }, 4000);
      return;
    }

    try {
      await this.projectService.changePriority(this.Group.id, element.projects.id, index).toPromise();
    } catch (error) {
      await this.loadProjectChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
  }

  async moveDown(index: number, element: any) {
    if (index === this.projectChoices.length - 1) {
      this.customErrorMessage = "Cannot increment priority.";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
    try {
      await this.projectService.changePriority(this.Group.id, element.projects.id, index + 2).toPromise();
    } catch (error) {
      await this.loadProjectChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
  }

  searchFaculty(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.faculties = this.tempFaculty;
      return;
    }

    const searchResults = this.tempFaculty.filter(faculty =>
      faculty.name.toString().toLowerCase().includes(searchText)
    );

    if (searchResults.length > 0) {
      this.faculties = [
        ...searchResults,
      ];
    }
  }

  async loadFacultyChoices(): Promise<void> {
    try {
      await this.facultyService.getAllFacultyChoices(this.Student.group.id).toPromise()
        .then((data) => {
          console.log(data);
          this.facultyChoices = data.sort((a, b) => a.priority - b.priority);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async addToFacultyChoices(element: any) {
    for (const item of this.facultyChoices) {
      if (item.faculty.id === element.id) {
        this.customErrorMessage = "This faculty is already in your choices.";
        setTimeout(() => {
          this.closeError();
        }, 4000);
        return;
      }
    }
    try {
      await this.facultyService.saveFacultyChoice(this.Group.id, element.id).toPromise();
      await this.loadFacultyChoices();
      this.customSuccessMessage = "Faculty added in your choices";
      setTimeout(() => {
        this.closeError();
      }, 4000);
    } catch (error) {

    }
  }

  async removeFromFacultyChoices(element: any): Promise<void> {
    try {
      await this.facultyService.removeFacultyChoice(element.faculty.id, this.Group.id).toPromise();
      await this.loadFacultyChoices();
    } catch (error) {
      await this.loadFacultyChoices();
      console.error("Error removing project choice:", error);
    }
  }

  async moveFacultyUp(index: number, element: any) {
    if (index === 0) {
      this.customErrorMessage = "Cannot decrement priority.";
      setTimeout(() => {
        this.customErrorMessage = undefined;
      }, 4000);
      return;
    }

    try {
      await this.facultyService.changePriority(this.Group.id, element.faculty.id, index).toPromise();
      await this.loadFacultyChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
    } catch (error) {
      console.log(error);
      await this.loadFacultyChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
  }

  async moveFacultyDown(index: number, element: any) {
    if (index === this.facultyChoices.length - 1) {
      this.customErrorMessage = "Cannot increment priority.";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
    try {
      await this.facultyService.changePriority(this.Group.id, element.faculty.id, index + 2).toPromise();
      await this.loadFacultyChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
    } catch (error) {
      console.log(error);
      await this.loadProjectChoices();
      this.customSuccessMessage = "Priority changed!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
  }

  openGroupRequests() {
    const dialogRef = this.dailog.open(GroupModalComponent, {
      width: '500px',
      height: '450px',
      data: this.Group
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.loadGroup(this.Student.group.id);
    });
  }

  closeError() {
    this.customErrorMessage = undefined;
    this.customSuccessMessage = undefined;
  }
}
