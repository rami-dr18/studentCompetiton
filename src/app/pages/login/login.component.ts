import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  userService = inject(UserService);
  loginSuccess: boolean = false;
  loginError: boolean = false;
  errorMessage: string = '';
  router = inject(Router);
  onLogin() {
    const formValue = this.loginForm.value;
    this.userService.onUserLogin(formValue).subscribe({
      next: (res: any) => {
        localStorage.setItem('studentId', res.userId);
        localStorage.setItem('loggedUser', JSON.stringify(res));
        this.loginSuccess = true;
        this.loginError = false;
        setTimeout(() => {
          this.loginSuccess = false;
        }, 3000);
        this.router.navigateByUrl('/home');
        this.userService.loggedUserId = res.userId;
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginError = true;
        this.loginSuccess = false;
        this.errorMessage = 'Log in  failed. Please try again.';
        setTimeout(() => {
          this.loginError = false;
        }, 5000);
      },
    });
  }
}
