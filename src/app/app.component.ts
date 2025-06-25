import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'studentCompetition';
  userService = inject(UserService);
  router = inject(Router);
  logout() {
    localStorage.removeItem('studentId');
    localStorage.removeItem('loggedUser');
    this.userService.loggedUserId = '';
    this.router.navigateByUrl('/home');
  }
}
