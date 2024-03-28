import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-filter',
  templateUrl: './group-filter.component.html',
  styleUrl: './group-filter.component.css'
})
export class GroupFilterComponent {
  constructor(
    public dialogRef: MatDialogRef<GroupFilterComponent>
  ) { }

  selectFilter(filter: string): void {
    this.dialogRef.close(filter);
  }
}
