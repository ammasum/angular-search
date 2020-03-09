import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './users/lists/lists/lists.component';
import { LoginComponent } from './auth/login/login.component';
// import { AuthGuardService as authGuard } from './_service/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
