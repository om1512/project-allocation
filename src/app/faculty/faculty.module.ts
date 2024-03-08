import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacultyComponent } from './faculty.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FacultyComponent, HomeComponent, GroupsComponent],
  imports: [
    BrowserModule,
    FacultyRoutingModule,
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
  ],
  bootstrap: [FacultyComponent],
})
export class FacultyModule {}
