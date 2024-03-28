import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
<<<<<<< HEAD
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
=======

>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
=======
  @ViewChild(ErrorMessageComponent)
  errorMessageComponent: ErrorMessageComponent;
  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;

>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905
  loginForm: FormGroup;
  customErrorMessage: string = undefined;

<<<<<<< HEAD
  constructor(private loginService: LoginServiceService, private cookieService: CookieService, private router: Router) { }
=======
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  async handleSubmit(): Promise<void> {
    setTimeout(() => {
      this.closeError();
    }, 7000);

    const password = this.loginForm.get('password').value
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;

<<<<<<< HEAD
      if (password.length < 6) {
        this.customErrorMessage = 'Password must be 6 digit long';
      } else {
        await this.loadData(email);
        this.customErrorMessage = undefined;
      }
=======
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905
    } else {
      if (this.loginForm.get('email').errors) {
        this.customErrorMessage = 'Email is not valid.';
      } else if (this.loginForm.get('password').errors) {
        this.customErrorMessage = 'Password is required.';
      } else {
        this.customErrorMessage = 'Email is not valid.';
      }
    }
  }

<<<<<<< HEAD
  async loadData(email: string): Promise<void> {
    this.loginService.getUsers(email).subscribe(
      (data) => {
        if (data.password === this.loginForm.get("password").value) {
          this.cookieService.set('Login-cred', JSON.stringify(data), 3);
          if (data.type == "Student") {
            this.router.navigate(['student/dashboard']);
          } else if (data.type == "Faculty") {
            this.router.navigate(['faculty/dashboard']);
          } else {
            this.router.navigate(['admin/dashboard']);
          }
        } else {
          this.customErrorMessage = 'Email or password may be incorrect.';
        }
      },
      (error) => {
        this.customErrorMessage = 'Email or password may be incorrect.';
      }
    );
  }

  closeError() {
    this.customErrorMessage = undefined;
  }
=======
>>>>>>> 2e50e62dad0c80403a2f6a633b3586e703e21905
}
