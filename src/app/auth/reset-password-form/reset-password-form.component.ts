import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  userId: string;
  token: string;
  resetPasswordForm: FormGroup;
  isLoading = false;
  private errorMessageSubscription: Subscription;
  showModal = false;
  differentPasswords = false;
  errorMessage: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      passwordRepeat: new FormControl(null, [Validators.required]),
      userId: new FormControl(null),
      passwordToken: new FormControl(null)
    });

    this.errorMessageSubscription = this.authService.getErrorDataListener().subscribe(errorMessage => {
      this.errorMessage = errorMessage;
      this.showModal = true;
    });
  }

  onSubmit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.isLoading = true;
    this.authService.resetPassword(this.resetPasswordForm.value.password, this.userId, this.token);
  }

  hide() {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }

}
