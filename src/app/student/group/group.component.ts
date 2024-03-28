import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { ProfileService } from '../service/profile.service';
import { GroupServiceService } from '../service/group-service.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})

export class GroupComponent implements OnInit {
  @Input() isInGroup: boolean = true;
  @Input() Student: any;
  @Input() profileId: string;
  Group: any;
  customErrorMessage: string = undefined;
  customSuccessMessage: string = undefined;
  displayedColumns: string[] = ['Priority', 'Title', 'Faculty'];
  dataSource: any[] = [
    {
      'title': 'School Management System',
      'faculty': 'SPS'
    },
    {
      'title': 'Library Management System',
      'faculty': 'AKG'
    },
    {
      'title': 'Hospital Management System',
      'faculty': 'APV'
    }
  ];

  constructor(
    private dailog: MatDialog,
    private profileService: ProfileService,
    private groupService: GroupServiceService,
    private projectService: ProjectService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.profileId);
    await this.loadGroup();
    await this.loadProjectChoice();
  }

  openModal(): void {
    const dialogRef = this.dailog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {

    });
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.Student = data;
      console.log(data);
    } catch (error) {
      console.log("Error while loading the profile : " + error);
    }
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.Student.group.id).toPromise();
      this.Group = data;
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  async loadProjectChoice() {
    try {
      const data = await this.projectService.getProjectChoice(this.Group.id).toPromise().then((data) => {
        this.dataSource = data.sort((a, b) => a.priority - b.priority);
        console.log(this.dataSource);
      });
    } catch (error) {
      console.log("Error while loading choices : " + error);
    }
  }

  closeError() {
    this.customErrorMessage = undefined;
    this.customSuccessMessage = undefined;
  }
}
