import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/authentication/login/login.component';
import { DashboardComponent } from '../app/student/dashboard/dashboard.component';
import { AuthGuard } from './authentication/service/auth.guard';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
