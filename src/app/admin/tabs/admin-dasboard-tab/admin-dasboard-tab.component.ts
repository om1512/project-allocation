import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dasboard-tab',
  templateUrl: './admin-dasboard-tab.component.html',
  styleUrl: './admin-dasboard-tab.component.css',
})
export class AdminDasboardTabComponent implements OnInit {
  selectedTab: string = 'tab1';
  students: any[] = [];
  faculties: any[] = [];
  loading: boolean = false;
  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.loadStudents();
    this.loadFaculty();
  }

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  async loadStudents(): Promise<void> {
    this.loading = true;
    this.adminService.getAllStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }

  async loadFaculty(): Promise<void> {
    this.loading = true;
    this.adminService.getAllFaculties().subscribe((data) => {
      console.log('Faculties : ' + data);
      this.faculties = data;
      this.loading = false;
    });
  }

  formatPhoneNumber(phone: string): string {
    if (phone && phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  }
}
