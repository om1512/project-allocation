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
<<<<<<< HEAD
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
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { GroupTileComponent } from './components/group-tile/group-tile.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { AddMemberCardComponent } from './components/add-member-card/add-member-card.component';
import { CustomProjectModalComponent } from './student/components/custom-project-modal/custom-project-modal.component';
import { ConfirmLeaveComponent } from './student/components/confirm-leave/confirm-leave.component';
import { GroupsComponent } from './student/components/groups/groups.component';
import { GroupCardComponent } from './student/components/group-card/group-card.component';
import { GroupModalComponent } from './student/components/group-modal/group-modal.component';
import { GroupRequestsCardComponent } from './student/components/group-requests-card/group-requests-card.component';
import { FlowModalComponent } from './student/components/flow-modal/flow-modal.component';
import { FlowTileComponent } from './student/components/flow-tile/flow-tile.component';
import { GroupFilterComponent } from './student/components/group-filter/group-filter.component';
import { SendRequestComponent } from './student/send-request/send-request.component';
import { ProjectChoiceComponent } from './student/project-choice/project-choice.component';
import { RemoveMemberComponent } from './student/remove-member/remove-member.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'transparent',
  pbColor: '#F9D88B',
};
=======
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginServiceService } from './authentication/service/login-service.service';
import { AuthGuard } from './authentication/service/auth.guard';
import { AuthInterceptor } from './authentication/service/auth.interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FacultyModule } from './faculty/faculty.module';
import { AdminModule } from './admin/admin.module';
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905

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
<<<<<<< HEAD
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
    GroupTileComponent,
    MemberCardComponent,
    AddMemberCardComponent,
    CustomProjectModalComponent,
    ConfirmLeaveComponent,
    GroupsComponent,
    GroupCardComponent,
    GroupModalComponent,
    GroupRequestsCardComponent,
    FlowModalComponent,
    FlowTileComponent,
    GroupFilterComponent,
    SendRequestComponent,
    ProjectChoiceComponent,
    RemoveMemberComponent,
=======
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905
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
<<<<<<< HEAD
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
=======
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    EditorModule,
    FacultyModule,
    AdminModule
  ],
  providers: [
    LoginServiceService,
    AuthGuard,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
