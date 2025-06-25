import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionServiceService } from '../../services/competition.service';
import { competitionModel, project } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-submit-project',
  imports: [FormsModule],
  templateUrl: './submit-project.component.html',
  styleUrl: './submit-project.component.css',
})
export class SubmitProjectComponent {
  currentCompetitionId: number = 0;
  competitionData: competitionModel = new competitionModel();
  compService = inject(CompetitionServiceService);
  userServie = inject(UserService);
  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((res: any) => {
      this.currentCompetitionId = res.id;
      this.getCompetitionById();
    });
  }
  projectObj: project = new project();
  getCompetitionById() {
    this.compService.getCompetitionById(this.currentCompetitionId).subscribe({
      next: (res) => {
        this.competitionData = res;
      },
      error: (err) => {
        console.error('Error fetching competition details:', err);
      },
    });
  }
  onSave() {
    this.projectObj.userId = Number(this.userServie.loggedUserId);
    this.projectObj.competitionId = this.currentCompetitionId;
    this.compService.submitProject(this.projectObj).subscribe({
      next: (res) => {
        debugger;
        console.log('Project submitted successfully:', res);
        alert('Project submitted successfully');
        this.projectObj = new project();
      },
      error: (err) => {
        console.error('Error submitting project:', err);
        alert('Failed to submit project. Please try again.');
      },
    });
  }
}
