import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() message: string;
  displayErrorMessage: boolean = true;
  hideAnimation: string = '';

  ngOnInit(): void {
    this.hideAnimation = '';

    setTimeout(() => {
      this.hideErrorMessage();
    }, 5000);
  }

  hideErrorMessage(): void {
    this.displayErrorMessage = false;
  }

  showErrorMessage(): void {
    this.displayErrorMessage = true;

    setTimeout(() => {
      this.displayErrorMessage = false;
    }, 5000);
  }
}
