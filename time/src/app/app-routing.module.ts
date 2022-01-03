import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/services/auth.guard';
import { AttendanceComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'account/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
