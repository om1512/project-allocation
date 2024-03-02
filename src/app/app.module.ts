import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../app/components/custom-button/custom-button.component';
import { LoginComponent } from '../app/authentication/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../app/student/dashboard/dashboard.component';
import { NavComponent } from './student/components/nav/nav.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HorizontalNavComponent } from './components/horizontal-nav/horizontal-nav.component';
import { HomeComponent } from '../app/student/home/home.component';
import { GroupComponent } from '../app/student/group/group.component';
import { ProjectComponent } from '../app/student/project/project.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AddStudentsComponent } from './admin/tabs/add-students/add-students.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin/components/admin-nav/admin-nav.component';
import { AdminNavHeaderComponent } from './admin/components/admin-nav-header/admin-nav-header.component';
import { AdminDasboardTabComponent } from './admin/tabs/admin-dasboard-tab/admin-dasboard-tab.component';
import { AdminStudentViewComponent } from './admin/tabs/admin-student-view/admin-student-view.component';
import { AddFacultiesComponent } from './admin/tabs/add-faculties/add-faculties.component';
import { AddUsersComponent } from './admin/tabs/add-users/add-users.component';
import { AdminResultPopupComponent } from './admin/components/admin-result-popup/admin-result-popup.component';
import { ManageFacultyComponent } from './admin/tabs/manage-faculty/manage-faculty.component';
import { AdminFacultyCardComponent } from './admin/components/admin-faculty-card/admin-faculty-card.component';
import { FacultyPopupComponent } from './admin/components/faculty-popup/faculty-popup.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginServiceService } from './authentication/service/login-service.service';
import { AuthGuard } from './authentication/service/auth.guard';
import { AuthInterceptor } from './authentication/service/auth.interceptor';
import { PhaseControlComponent } from './admin/tabs/phase-control/phase-control.component';
import { CommunicationComponent } from './admin/tabs/communication/communication.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    NavItemComponent,
    HorizontalNavComponent,
    HomeComponent,
    GroupComponent,
    ProjectComponent,
    ErrorMessageComponent,
    AddStudentsComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    AdminNavHeaderComponent,
    AdminDasboardTabComponent,
    AdminStudentViewComponent,
    AddFacultiesComponent,
    AddUsersComponent,
    AdminResultPopupComponent,
    ManageFacultyComponent,
    AdminFacultyCardComponent,
    FacultyPopupComponent,
    PhaseControlComponent,
    CommunicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [
    LoginServiceService,
    AuthGuard,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
