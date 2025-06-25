import { Component, inject } from '@angular/core';
import { registerUser } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Add this import
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUser: registerUser = {
    fullName: '',
    email: '',
    password: '',
    collegeName: '',
    role: 'student',
  };
  registrationSuccess: boolean = false;
  registrationError: boolean = false;
  errorMessage: string = '';
  http = inject(HttpClient);
  onRegister() {
    this.http
      .post(
        'https://api.freeprojectapi.com/api/ProjectCompetition/register',
        this.registerUser
      )
      .subscribe({
        next: (res: any) => {
          this.registrationSuccess = true;
          this.registrationError = false;
          setTimeout(() => {
            this.registrationSuccess = false;
          }, 3000);
        },
        error: (error: any) => {
          this.registrationError = true;
          this.registrationSuccess = false;
          this.errorMessage = 'Registration failed. Please try again.';
          setTimeout(() => {
            this.registrationError = false;
          }, 5000);
        },
      });
  }
}
