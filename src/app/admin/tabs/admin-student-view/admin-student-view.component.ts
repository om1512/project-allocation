import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-student-view',
  templateUrl: './admin-student-view.component.html',
  styleUrl: './admin-student-view.component.css',
})
export class AdminStudentViewComponent implements OnInit {
  @Input() student: any = {};
  ngOnInit(): void {
    console.log(this.student);
  }

  formatPhoneNumber(phone: string): string {
    if (phone && phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  }

}
