import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../error/page-not-found/page-not-found.component';
import { ResetComponent } from './reset/reset.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/reset', component: ResetComponent},
  { path: 'auth/reset-password/:token/:userId', component: ResetPasswordFormComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})

export class AuthRoutingModule {}
