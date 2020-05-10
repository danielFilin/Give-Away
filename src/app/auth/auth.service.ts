import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  isAuthenticated = false;
  isAdmin = false;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private authUserCredentials = new Subject<{userId: string, passwordToken: string}>();
  private errorDataListener = new Subject<string>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getCredentialsListener() {
    return this.authUserCredentials.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  getErrorDataListener() {
    return this.errorDataListener.asObservable();
  }

  createUser(name, email, password) {
    const newUser: AuthData = {name, email, password};
    this.http.post<{message: string}>(BACKEND_URL + 'signup', newUser).subscribe(() => {
      this.router.navigate(['/auth/login']);
    }, error => {
      this.authStatusListener.next(false);
      this.router.navigate(['/auth/signup']);
      this.errorDataListener.next(error.error.message);
    });
  }

  login(email, password) {
    const userCredentials = {
      email,
      password
    };
    this.http.post<{message: string, token: string, expiresIn: number, userId: string, admin: boolean}>(BACKEND_URL +
    'login', userCredentials)
    .subscribe((responseData) => {
      this.token = responseData.token;
      if (this.token) {
        const expiresInDuration = responseData.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = responseData.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthorizationData(this.token, expirationDate, this.userId, responseData.admin);
        this.router.navigate(['/home']);
      }
      if (responseData.admin) {
        this.isAdmin = true;
        this.adminStatusListener.next(true);
      }
    }, error => {
      this.authStatusListener.next(false);
      this.router.navigate(['/auth/login']);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    if (!authInformation) {
      return;
    }
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);

      if (authInformation.isAdmin) {
        console.log(1);
        this.isAdmin = true;
        this.adminStatusListener.next(true);
      }
    }

  }

  onUserLogout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/auth/login']);
    this.clearAuthData();
  }

  private saveAuthorizationData(token: string, expirationDate: Date, userId: string, isAdmin: boolean) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    if (isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.setItem('isAdmin', 'false');
    }

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  private setAuthTimer(duration: number) {
    console.log('Settingtimer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.onUserLogout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirtationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');

    // if (isAdmin === 'true') {

    // }
    console.log(isAdmin);
    if (!token || !expirtationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirtationDate),
      userId,
      isAdmin
    };
  }

  sendResetPasswordLink(email) {
    const userCredentials = {
      email,
    };
    this.http.post<{message: string}>(BACKEND_URL + 'reset', userCredentials).subscribe((response) => {
      this.errorDataListener.next(response.message);
    }, error => {
      this.router.navigate(['/auth/reset']);
      this.errorDataListener.next(error.error.message);
    });
  }

  resetPassword(password, userId, token) {
    const userCredentials = {
      password,
      userId,
      token
    };
    this.http.post<{message: string}>(BACKEND_URL + 'reset-password', userCredentials ).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/auth/login']);
    }, error => {
      console.log(error);
      this.router.navigate(['/auth/login']);
    });
  }

}
