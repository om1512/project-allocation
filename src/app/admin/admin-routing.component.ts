import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDasboardTabComponent } from './tabs/admin-dasboard-tab/admin-dasboard-tab.component';
import { AddUsersComponent } from './tabs/add-users/add-users.component';
import { ManageFacultyComponent } from './tabs/manage-faculty/manage-faculty.component';
import { PhaseControlComponent } from './tabs/phase-control/phase-control.component';
import { CommunicationComponent } from './tabs/communication/communication.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: AdminDasboardTabComponent,
      },
      {
        path: 'addUsers',
        component: AddUsersComponent,
      },
      {
        path: 'manageFaculties',
        component: ManageFacultyComponent,
      },
      {
        path: 'phaseControl',
        component: PhaseControlComponent,
      },
      {
        path: 'communication',
        component: CommunicationComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
