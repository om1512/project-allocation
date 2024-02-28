import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  customErrorMessage: string = undefined;
  loading: boolean = false;
  isLoading: boolean = false;

  constructor(private loginService: LoginServiceService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  async handleSubmit(): Promise<void> {
    setTimeout(() => {
      this.closeError();
    }, 7000);

    this.isLoading = true;
    const password = this.loginForm.get('password').value
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;

      if (password.length < 6) {
        this.isLoading = false;
        this.customErrorMessage = 'Password must be 6 digit long';
      } else {
        await this.loadData(email);
        this.customErrorMessage = undefined;
        this.isLoading = false;
      }
    } else {
      if (this.loginForm.get('email').errors) {
        this.customErrorMessage = 'Email is not valid.';
      } else if (this.loginForm.get('password').errors) {
        this.customErrorMessage = 'Password is required.';
      } else {
        this.customErrorMessage = 'Email is not valid.';
      }
      this.isLoading = false;
    }
  }

  async loadData(email: string): Promise<void> {
    this.loginService.getUsers(email).subscribe(
      (data) => {
        if (data.password === this.loginForm.get("password").value) {
          this.cookieService.set('Login-cred', JSON.stringify(data), 3);
          this.isLoading = false;
          if (data.type == "Student") {
            this.router.navigate(['student/dashboard']);
          } else if (data.type == "Faculty") {
            this.router.navigate(['faculty/dashboard']);
          } else {
            this.router.navigate(['admin/dashboard']);
          }
        } else {
          this.isLoading = false;
          this.customErrorMessage = 'Email or password may be incorrect.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.customErrorMessage = 'Email or password may be incorrect.';
      }
    );
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
}
