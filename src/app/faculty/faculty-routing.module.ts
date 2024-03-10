import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupViewComponent } from './group-view/group-view.component';

const routes: Routes = [
  {
    path: 'faculty',
    component: FacultyComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
      },
      {
        path: 'group/detail',
        component: GroupViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultyRoutingModule {}
