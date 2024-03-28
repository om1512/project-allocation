import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../authentication/service/auth.guard';
import { GroupComponent } from './group/group.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'project',
        component: ProjectComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
