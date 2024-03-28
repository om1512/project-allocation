import { Component, Input } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { GroupServiceService } from '../service/group-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomProjectModalComponent } from '../components/custom-project-modal/custom-project-modal.component';
import { ProfileService } from '../service/profile.service';


@Component({
  selector: 'app-project-choice',
  templateUrl: './project-choice.component.html',
  styleUrl: './project-choice.component.css'
})

export class ProjectChoiceComponent {
  @Input() Student;
  @Input() profileId;
  Group: any
  displayedColumns: string[] = ['no', 'project_id', 'name', 'actions'];
  dataSource: any[];
  projectChoices: any[];
  filterProject: any[];

  constructor(
    private projectService: ProjectService,
    private groupService: GroupServiceService,
    private dailog: MatDialog,
    private profileService: ProfileService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.profileId)
    await this.loadProject();
    await this.loadGroup();
    await this.loadProjectChoice();
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

  async loadProject(): Promise<void> {
    try {
      const data = await this.projectService.getAll().toPromise();
      this.dataSource = data;
      this.filterProject = data;
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

  searchProjects(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterProject = this.dataSource;
      return;
    }

    const searchResults = this.dataSource.filter(project =>
      project.name.toString().toLowerCase().includes(searchText) ||
      project.id.toString().toLowerCase().includes(searchText)
    );

    this.filterProject = [...searchResults];
  }

  async loadProjectChoice() {
    try {
      const data = await this.projectService.getProjectChoice(this.Group.id).toPromise().then((data) => {
        this.projectChoices = data.sort((a, b) => a.priority - b.priority);
        console.log(this.projectChoices);
      });
    } catch (error) {
      console.log("Error while loading choices : " + error);
    }
  }

  async addChoice(element: any) {
    try {
      const data = await this.projectService.saveProjectChoice(this.Group.id, this.Student.id, element.id).toPromise();
    } catch (error) {
      console.log("Error while saving choice : " + error);
      await this.loadProjectChoice();
    }
  }

  async removeChoice(element: any) {
    try {
      const data = await this.projectService.removeProjectChoice(element.projects.id, this.Group.id).toPromise();
    } catch (error) {
      console.log("Error while removing choice : " + error);
      await this.loadProjectChoice();
    }
  }

  async incrementPriority(index: number, element: any) {
    if (index === 0) {
      console.log("Already the highest priority");
      return;
    }

    try {
      await this.projectService.changePriority(this.Group.id, element.projects.id, index).toPromise();
    } catch (error) {
      await this.loadProjectChoice();
      return;
    }
  }

  async decrementPriority(index: number, element: any) {
    if (index === this.projectChoices.length - 1) {
      console.log("Already the lowest priority");
      return;
    }
    try {
      await this.projectService.changePriority(this.Group.id, element.projects.id, index + 2).toPromise();
    } catch (error) {
      await this.loadProjectChoice();
      return;
    }
  }

  openCustomProjectModal(): void {
    const dialogRef = this.dailog.open(CustomProjectModalComponent, {
      width: '400px',
      height: '330px',
      data: this.Group.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProject();
    });
  }
}
