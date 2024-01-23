import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextFieldComponent } from '../components/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../components/custom-button/custom-button.component';
import { LoginComponent } from '../pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TextFieldComponent,
    CustomButtonComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
