import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../app/components/custom-button/custom-button.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { NavComponent } from '../app/components/nav/nav.component';
import { NavItemComponent } from '../app/components/nav-item/nav-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon';
import { HorizontalNavComponent } from '../app/components/horizontal-nav/horizontal-nav.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { GroupComponent } from '../app/pages/group/group.component';
import { ProjectComponent } from '../app/pages/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    NavItemComponent,
    HorizontalNavComponent,
    HomeComponent,
    GroupComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
