import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  @Input() isInGroup: boolean = false;
  customErrorMessage: string = undefined;
  success: boolean = false;
  fail: boolean = false;
  student: any;

  constructor(
    private dailog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

  }

  openModal(): void {
    const dialogRef = this.dailog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isInGroup = result.status;
      this.customErrorMessage = result.message;

      console.log(this.customErrorMessage);

      setTimeout(() => {
        this.closeError();
      }, 7000);
    });
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
}
