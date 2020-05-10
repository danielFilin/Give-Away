import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListener: Subscription;
  private adminListener: Subscription;
  isUserAuthenticated = false;
  isUserAdmin = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authListener = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
    this.isUserAdmin = this.authService.getIsAdmin();
    this.adminListener = this.authService.getAdminStatusListener()
    .subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    });
  }

  onLogout() {
    this.authService.onUserLogout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
    this.adminListener.unsubscribe();
  }

}
