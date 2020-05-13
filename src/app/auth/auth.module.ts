import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset/reset.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ResetComponent,
    ResetPasswordFormComponent,
    InfoModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule
  ]
})

export class AuthModule {}
