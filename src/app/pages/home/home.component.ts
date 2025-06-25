import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CompetitionServiceService as CompetitionService } from '../../services/competition.service';
import { Competition } from '../../services/models';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  competitions: Competition[] = [];
  loading = true;
  error = '';
  constructor(private competitionService: CompetitionService) {}

  ngOnInit() {
    this.loadCompetitions();
  }
  loadCompetitions() {
    this.competitionService.getAllCompetitions().subscribe({
      next: (data) => {
        this.competitions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load competitions';
        this.loading = false;
        console.error('Error loading competitions:', err);
      },
    });
  }
  getBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'badge-success';
      case 'upcoming':
        return 'badge-warning';
      case 'closed':
        return 'badge-error';
      case 'new':
        return 'badge-outline badge-accent';
      case 'completed':
        return 'badge-secondary';
      default:
        return 'badge-neutral';
    }
  }
  currentYear: number = new Date().getFullYear();
}
