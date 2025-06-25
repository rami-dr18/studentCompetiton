import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition, competitionModel, project } from './models';
@Injectable({
  providedIn: 'root',
})
export class CompetitionServiceService {
  constructor(private http: HttpClient) {}
  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/GetAllCompetition'
    );
  }
  getCompetitionById(id: number): Observable<Competition> {
    return this.http.get<Competition>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/competition/' + id
    );
  }
  createCompetition(obj: competitionModel) {
    return this.http.post<competitionModel[]>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/competition',
      obj
    );
  }
  submitProject(obj: project) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/ProjectCompetition/project',
      obj
    );
  }
  onUpdateCompetition(obj: competitionModel, id: string) {
    return this.http.put<competitionModel[]>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/update/' + id,
      obj
    );
  }
  onDeleteCompetition(id: string) {
    return this.http.delete<competitionModel[]>(
      'https://api.freeprojectapi.com/api/ProjectCompetition/delete/' + id
    );
  }
}
