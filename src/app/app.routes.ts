import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentsComponent } from './pages/students/students.component';
import { SubmitProjectComponent } from './pages/submit-project/submit-project.component';
import { CompetitionComponent } from './pages/competition/competition.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'submitProject/:id',
    component: SubmitProjectComponent,
  },
  {
    path: 'competition',
    component: CompetitionComponent,
  },
];
