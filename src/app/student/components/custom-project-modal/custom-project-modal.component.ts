import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-custom-project-modal',
  templateUrl: './custom-project-modal.component.html',
  styleUrl: './custom-project-modal.component.css'
})
export class CustomProjectModalComponent implements OnInit {
  titleRequired: string = '';
  descRequired: string = '';
  group_id: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<CustomProjectModalComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.group_id = this.data;
  }

  async onSave() {
    if (this.titleRequired == '') {
      this.titleRequired = undefined;
    } else if (this.descRequired == '') {
      this.descRequired = undefined;
    } else {
      this.projectService.customProject({
        'id': this.group_id,
        'name': this.titleRequired,
        'desc': this.descRequired,
      }).subscribe((result) => {
        console.log('Success:', result);

      },
        (error) => {
          console.error('Error:', error);
          // Handle error
        });

      this.dialogRef.close({
        "status": true,
      });
    }
  }
}
