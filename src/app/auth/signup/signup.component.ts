import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  prohibittedEmail = false;
  isLoading = false;
  private authSubscription: Subscription;
  private errorMessageSubscription: Subscription;
  differentPasswords = false;
  errorMessage: string;
  isErrorOnSignup = false;
  infoMessage = 'the data you provided is incorrect';
  loginOnErrorTitle = 'Error: Signup Failed';
  btnClass = 'btn btn-danger';
  errClass = 'error';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null,  [Validators.required]),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
    });

    this.authSubscription = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
      this.isErrorOnSignup = true;
    });

    this.errorMessageSubscription = this.authService.getErrorDataListener().subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  onSubmit() {
    if (this.password.value !== this.repeatPassword.value) {
      this.differentPasswords = true;
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password);
  }

  get password() {
    return this.signupForm.get('password');
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

  onHandleError() {
    this.isErrorOnSignup = null;
  }

}
