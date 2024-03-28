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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  @ViewChild(ErrorMessageComponent)
  errorMessageComponent: ErrorMessageComponent;
  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;

  loginForm: FormGroup;
  customErrorMessage: string = '';
  loading: boolean = false;
  animation: any;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  handleSubmit(): void {
    const password = this.loginForm.get('password').value
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;

    } else {
      if (this.loginForm.get('email').errors) {
        this.customErrorMessage = 'Email is not valid.';
      } else if (this.loginForm.get('password').errors) {
        this.customErrorMessage = 'Password is required.';
      } else {
        this.customErrorMessage = 'Email is not valid.';
      }

      this.errorMessageComponent.showErrorMessage();
    }
  }

}
