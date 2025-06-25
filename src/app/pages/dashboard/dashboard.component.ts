import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { dashboard } from '../../services/models';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UserService) {}
  dahsboardData: dashboard = new dashboard();
  ngOnInit(): void {
    this.getDashboardData();
  }
  getDashboardData() {
    this.userService.getDashboard().subscribe({
      next: (data: any) => {
        this.dahsboardData = data;
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
    });
  }
}
