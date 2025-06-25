import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dashboard, userLogIn } from './models';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUserId: string = '';
  loggedUserName: any = undefined;
  dashboardData: dashboard = new dashboard();
  constructor(private http: HttpClient) {
    const loggedData = localStorage.getItem('studentId');
    const loggedUserData = localStorage.getItem('loggedUser');
    if (loggedData != null && loggedUserData != null) {
      this.loggedUserId = loggedData;
      this.loggedUserName = JSON.parse(loggedUserData).fullName;
    }
  }
  onUserLogin(obj: userLogIn) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/ProjectCompetition/login',
      obj
    );
  }
  getDashboard() {
    return this.http.get<dashboard>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/GetDashboardSummary/'
    );
  }
}
