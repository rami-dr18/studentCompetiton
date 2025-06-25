export interface Competition {
  competitionId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
export interface registerUser {
  fullName: string;
  email: string;
  password: string;
  collegeName: string;
  role: string;
}
export interface userLogIn {
  email: string;
  password: string;
}
export class competitionModel {
  competitionId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  constructor() {
    this.competitionId = 0;
    this.title = '';
    this.description = '';
    this.startDate = '';
    this.endDate = '';
    this.status = '';
  }
}
export interface competition {
  competitionId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
export class project {
  submissionId: number;
  competitionId: number;
  userId: number;
  projectTitle: string;
  description: string;
  githubLink: string;
  submissionDate: string;
  status: string;
  rank: number;
  constructor() {
    this.submissionId = 0;
    this.competitionId = 0;
    this.userId = 0;
    this.projectTitle = '';
    this.description = '';
    this.githubLink = '';
    this.submissionDate = '';
    this.status = '';
    this.rank = 0;
  }
}
export class dashboard {
  totalUsers: number;
  totalCompetitions: number;
  ongoingCompetitions: number;
  completedCompetitions: number;
  upcomingCompetitions: number;
  totalProjectSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  winnersDeclared: number;
  constructor() {
    this.totalUsers = 0;
    this.totalCompetitions = 0;
    this.ongoingCompetitions = 0;
    this.completedCompetitions = 0;
    this.upcomingCompetitions = 0;
    this.totalProjectSubmissions = 0;
    this.pendingSubmissions = 0;
    this.approvedSubmissions = 0;
    this.rejectedSubmissions = 0;
    this.winnersDeclared = 0;
  }
}
