import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../app/components/custom-button/custom-button.component';
import { LoginComponent } from '../app/authentication/login/login.component';
import { HttpClientModule } from '@angular/common/http';
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
import { AddStudentsComponent } from './admin/add-students/add-students.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin/components/admin-nav/admin-nav.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileTileComponent } from './components/profile-tile/profile-tile.component';
import { MatTableModule } from '@angular/material/table';
import { ProfileModalComponent } from './student/components/profile-modal/profile-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { ProjectModalComponent } from './student/components/project-modal/project-modal.component';
import { FilterModalComponent } from './student/components/filter-modal/filter-modal.component';
import { LottieAnimationComponent } from './student/components/lottie-animation/lottie-animation.component';
import { CreateGroupModalComponent } from './student/components/create-group-modal/create-group-modal.component';
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
    ProfileCardComponent,
    ProfileTileComponent,
    ProfileModalComponent,
    RequestModalComponent,
    RequestCardComponent,
    ProjectModalComponent,
    FilterModalComponent,
    LottieAnimationComponent,
    CreateGroupModalComponent,
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
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
