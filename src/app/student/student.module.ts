import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmLeaveComponent } from './components/confirm-leave/confirm-leave.component';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';
import { CustomProjectModalComponent } from './components/custom-project-modal/custom-project-modal.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { FlowModalComponent } from './components/flow-modal/flow-modal.component';
import { FlowTileComponent } from './components/flow-tile/flow-tile.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupFilterComponent } from './components/group-filter/group-filter.component';
import { GroupModalComponent } from './components/group-modal/group-modal.component';
import { GroupRequestsCardComponent } from './components/group-requests-card/group-requests-card.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LottieAnimationComponent } from './components/lottie-animation/lottie-animation.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { GroupComponent } from './group/group.component';
import { AddMemberCardComponent } from './components/add-member-card/add-member-card.component';
import { GroupTileComponent } from './components/group-tile/group-tile.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileTileComponent } from './components/profile-tile/profile-tile.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectChoiceComponent } from './project-choice/project-choice.component';
import { RemoveMemberComponent } from './remove-member/remove-member.component';
import { SendRequestComponent } from './send-request/send-request.component';


@NgModule({
  declarations: [
    StudentComponent,
    ConfirmLeaveComponent,
    CreateGroupModalComponent,
    CustomProjectModalComponent,
    FilterModalComponent,
    FlowModalComponent,
    FlowTileComponent,
    GroupCardComponent,
    GroupFilterComponent,
    GroupModalComponent,
    GroupRequestsCardComponent,
    GroupsComponent,
    LottieAnimationComponent,
    ProfileModalComponent,
    ProjectModalComponent,
    GroupComponent,
    AddMemberCardComponent,
    
    GroupTileComponent,
    MemberCardComponent,
    ProfileCardComponent,
    ProfileTileComponent,
    RequestCardComponent,
    RequestModalComponent,
    HomeComponent,
    ProjectComponent,
    ProjectChoiceComponent,
    RemoveMemberComponent,
    SendRequestComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxUiLoaderModule,
    MatDialogModule, 
    MatTableModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ]
})
export class StudentModule { }
