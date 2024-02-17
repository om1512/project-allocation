import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Home', component: DashboardComponent },
  { path: 'Group', component: DashboardComponent },
  { path: 'Project', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
