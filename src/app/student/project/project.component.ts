import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from '../components/project-modal/project-modal.component';
import { FilterModalComponent } from '../components/filter-modal/filter-modal.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['no', 'project_id', 'name'];
  dataSource: any[];
  filter: string = 'name';

  constructor(private projectService: ProjectService, private dailog: MatDialog) { }

  ngOnInit(): void {
    this.loadProject();
  }

  async loadProject(): Promise<void> {
    this.projectService.getAll().subscribe(
      (data) => {
        this.dataSource = data;
      }
    );
  }

  openModal(rowData: any): void {
    const dialogRef = this.dailog.open(ProjectModalComponent, {
      width: '500px',
      height: '380px',
      data: rowData,
    });

    console.log(rowData);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("dailog closed");
      console.log(result);
    });
  }

  openFilterModal(): void {
    const dialogRef = this.dailog.open(FilterModalComponent, {
      width: '200px',
      height: '100px',
      position: {
        top: '145px',
        right: '20px'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("dialog closed");
      if (result !== undefined) {
        this.setFilter(result);
        console.log(this.filter);
      }
    });
  }

  setFilter(filter: string): void {
    this.filter = filter;
  }

  searchProjects(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.loadProject();
      return;
    }

    let filterProperty: string;
    if (this.filter === 'name') {
      filterProperty = 'name';
    } else {
      filterProperty = 'id';
    }

    const searchResults = this.dataSource.filter(project =>
      project[filterProperty].toString().toLowerCase().includes(searchText)
    );

    if (searchResults.length > 0) {
      this.dataSource = [
        ...searchResults,
      ];
    }
  }
}
