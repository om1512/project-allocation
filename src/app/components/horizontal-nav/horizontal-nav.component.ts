import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestModalComponent } from '../request-modal/request-modal.component';

@Component({
  selector: 'app-horizontal-nav',
  templateUrl: './horizontal-nav.component.html',
  styleUrl: './horizontal-nav.component.css'
})
export class HorizontalNavComponent implements OnInit {
  requests: any[];

  constructor(private dailog: MatDialog) { }

  ngOnInit(): void {
    this.requests = ["hl"]
  }

  openModal(): void {
    const dialogRef = this.dailog.open(RequestModalComponent, {
      width: '450px',
      height: '600px',
      position: {
        top: '85px',
        right: '20px'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("dailog closed");
      console.log(result);
    });
  }
}
