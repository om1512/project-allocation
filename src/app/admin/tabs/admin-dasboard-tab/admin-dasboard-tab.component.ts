import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dasboard-tab',
  templateUrl: './admin-dasboard-tab.component.html',
  styleUrl: './admin-dasboard-tab.component.css',
})
export class AdminDasboardTabComponent implements OnInit, OnDestroy {
  selectedTab: string = 'tab1';
  students: any[] = [];
  faculties: any[] = [];
  groups: any[] = [];
  student: any = {};
  private studentSubscription: Subscription;
  private facultySubscription: Subscription;
  private groupSubscription: Subscription;
  studentView: boolean = false;

  totalStudents: any = 0;
  currentYear: any = 0;
  totalFaculties: any = 0;
  currentFaculties: any = 0;
  totalProjects: any = 0;
  currentProject: any = 0;

  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;
  constructor(
    private adminService: AdminService,
    private loader: NgxUiLoaderService
  ) {}
  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
    if (this.facultySubscription) {
      this.facultySubscription.unsubscribe();
    }
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.loadStudents();
    this.loadFaculty();
    this.loadGroup();
  }

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  loadStudents(): void {
    this.studentSubscription = this.adminService.getAllStudents().subscribe(
      (data) => {
        console.log(data);
        this.students = data;
        this.totalStudents = this.students.length;
        this.students.forEach((element) => {
          const year = new Date(element.year).getFullYear();
          const currentYear = new Date().getFullYear();
          if (currentYear - year == 3) {
            this.currentYear += 1;
          }
        });
      },
      (error) => {
        console.error('Error loading students:', error);
      },
      () => {
        this.loader.stop();
      }
    );
  }

  loadFaculty(): void {
    this.facultySubscription = this.adminService.getAllFaculties().subscribe(
      (data) => {
        this.faculties = data;
        console.log(this.faculties);

        this.totalFaculties = this.faculties.length;
        this.faculties.forEach((element) => {
          if (element.available == true) {
            this.currentFaculties += 1;
          }
        });
      },
      (error) => {
        console.error('Error loading faculties:', error);
      },
      () => {
        this.loader.stop();
      }
    );
  }

  loadGroup(): void {
    this.groupSubscription = this.adminService.getAllProjects().subscribe(
      (data) => {
        this.groups = data;
        console.log(this.groups);

        this.totalProjects = this.groups.length;
        console.log('Length : ' + this.totalProjects);

        this.groups.forEach((element) => {
          const year = new Date(element.year).getFullYear();
          const currentYear = new Date().getFullYear();
          if (currentYear == year) {
            this.currentProject += 1;
          }
        });
      },
      (error) => {
        console.error('Error loading faculties:', error);
      },
      () => {
        this.loader.stop();
      }
    );
  }

  formatPhoneNumber(phone: string): string {
    if (phone && phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  }

  onRowClick(s) {
    console.log('clicked');
    this.student = s;
    this.studentView = true;
  }

  receiveDataFromChild(data: boolean) {
    this.studentView = data;
    this.student = {};
  }
}
