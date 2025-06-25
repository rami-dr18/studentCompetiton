import { Component, inject, OnInit } from '@angular/core';
import { competition, competitionModel } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CompetitionServiceService } from '../../services/competition.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-competition',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css',
})
export class CompetitionComponent implements OnInit {
  competitionSuccess: boolean = false;
  competitionError: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  compObj: competitionModel = new competitionModel();
  competitionService = inject(CompetitionServiceService);
  gridData: competitionModel[] = [];
  ngOnInit(): void {
    this.getAll();
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
  getAll() {
    this.competitionService.getAllCompetitions().subscribe({
      next: (res) => {
        this.gridData = res;
      },
      error: (err) => {
        this.errorMessage = 'Cannot Get Competitions. Please try again.';
      },
    });
  }
  onSave() {
    this.competitionService.createCompetition(this.compObj).subscribe({
      next: (res) => {
        this.competitionSuccess = true;
        this.competitionError = false;
        this.successMessage = 'Competition created successfully!';
        setTimeout(() => {
          this.competitionSuccess = false;
        }, 3000);
        this.compObj = new competitionModel(); // Reset the form
        this.getAll(); // Refresh the competition list
      },
      error: (err) => {
        this.competitionSuccess = false;
        this.competitionError = true;
        this.errorMessage = 'Competition creation failed. Please try again.';
        setTimeout(() => {
          this.competitionError = false;
        }, 3000);
      },
    });
  }
  editObj: competition = {
    competitionId: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
  };
  deleteObj: competition | null = null;
  editCompetition(competition: competition) {
    this.editObj = {
      competitionId: competition.competitionId,
      title: competition.title,
      description: competition.description,
      startDate: this.formatDateForInput(competition.startDate),
      endDate: this.formatDateForInput(competition.endDate),
      status: competition.status,
    };
    (document.getElementById('edit_modal') as HTMLDialogElement).showModal();
  }
  deleteCompetition(competition: competition) {
    this.deleteObj = {
      competitionId: competition.competitionId,
      title: competition.title,
      description: competition.description,
      startDate: competition.startDate,
      endDate: competition.endDate,
      status: competition.status,
    };
    (document.getElementById('delete_modal') as HTMLDialogElement).showModal();
  }
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  onUpdate() {
    this.competitionService
      .onUpdateCompetition(this.editObj, this.editObj.competitionId.toString())
      .subscribe({
        next: (res) => {
          this.competitionSuccess = true;
          this.competitionError = false;
          this.successMessage = 'Competition updated successfully!';
          setTimeout(() => {
            this.competitionSuccess = false;
          }, 3000);
          this.getAll(); // Refresh the competition list
          (document.getElementById('edit_modal') as HTMLDialogElement).close();
        },
        error: (err) => {
          this.competitionSuccess = false;
          this.competitionError = true;
          this.errorMessage = 'Competition update failed. Please try again.';
          setTimeout(() => {
            this.competitionError = false;
          }, 3000);
        },
      });
  }
  confirmDelete() {
    if (!this.deleteObj) {
      this.errorMessage = 'No competition selected for deletion.';
      this.competitionError = true;
      return;
    }

    this.competitionService
      .onDeleteCompetition(this.deleteObj.competitionId.toString())
      .subscribe({
        next: (res) => {
          this.competitionSuccess = true;
          this.competitionError = false;
          this.successMessage = 'Competition deleted successfully!';
          setTimeout(() => {
            this.competitionSuccess = false;
          }, 3000);
          this.getAll(); // Refresh the competition list
          (
            document.getElementById('delete_modal') as HTMLDialogElement
          ).close();
          this.deleteObj = null; // Reset after successful deletion
        },
        error: (err) => {
          this.competitionSuccess = false;
          this.competitionError = true;
          this.errorMessage = 'Competition deletion failed. Please try again.';
          setTimeout(() => {
            this.competitionError = false;
          }, 3000);
        },
      });
  }
  closeDeleteModal() {
    (document.getElementById('delete_modal') as HTMLDialogElement).close();
    this.deleteObj = null;
  }
}
