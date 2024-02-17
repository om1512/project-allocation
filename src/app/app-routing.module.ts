import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/authentication/login/login.component';
import { DashboardComponent } from '../app/student/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'student/dashboard', component: DashboardComponent },
  {
    path: 'student/Dashboard',
    redirectTo: 'student/dashboard',
    pathMatch: 'full',
  },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/Dashboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
