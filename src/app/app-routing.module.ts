import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/authentication/login/login.component';
import { DashboardComponent } from '../app/student/dashboard/dashboard.component';
<<<<<<< HEAD
=======
import { AuthGuard } from './authentication/service/auth.guard';
import { FacultyComponent } from './faculty/faculty.component';
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905

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
