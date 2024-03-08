import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/authentication/login/login.component';
import { DashboardComponent } from '../app/student/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './authentication/service/auth.guard';
import { AddUsersComponent } from './admin/tabs/add-users/add-users.component';
import { FacultyComponent } from './faculty/faculty.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'student/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/Dashboard',
    redirectTo: 'student/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/dashboard/Dashboard',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'admin/dashboard/add_users',
    component: AddUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/dashboard/AddUsers',
    redirectTo: 'admin/add_users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
