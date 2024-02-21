import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {

  constructor(public dialogRef: MatDialogRef<FilterModalComponent>) { }

  selectFilter(filter: string): void {
    this.dialogRef.close(filter);
  }
}
