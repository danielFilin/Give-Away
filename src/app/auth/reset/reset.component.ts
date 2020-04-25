import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  resetForm: FormGroup;
  isLoading = false;

  private errorMessageSubscription: Subscription;
  showModal = false;
  differentPasswords = false;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.errorMessageSubscription = this.authService.getErrorDataListener().subscribe(errorMessage => {
      this.showModal = true;
      this.errorMessage = errorMessage;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.sendResetPasswordLink(this.resetForm.value.email);
  }

  hide() {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
  }



}
