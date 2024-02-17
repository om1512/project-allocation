import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import * as lottie from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @ViewChild(ErrorMessageComponent) errorMessageComponent: ErrorMessageComponent;
  @ViewChild('lottieAnimation', { static: true }) lottieAnimationContainer!: ElementRef;


  loginForm: FormGroup;
  customErrorMessage: string = '';
  loading: boolean = false;
  animation: any;

  constructor(private loginService: LoginServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    lottie.default.loadAnimation({
      container: this.lottieAnimationContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/animation.json',
    });

  }

  handleSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      this.loadData(email);
      this.customErrorMessage = '';
    } else {
      if (this.loginForm.get('email').errors) {
        this.customErrorMessage = 'Email is required.';
      } else if (this.loginForm.get('password').errors) {
        this.customErrorMessage = 'Password is required.';
      } else {
        this.customErrorMessage = 'Email or password may be incorrect.';
      }

      this.errorMessageComponent.showErrorMessage();
    }
  }

  loadData(email: string): void {
    this.loginService.getUsers(email).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.customErrorMessage = 'Email or password may be incorrect.';
        this.errorMessageComponent.showErrorMessage();
      }
    );
  }
}
