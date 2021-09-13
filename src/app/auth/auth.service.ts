import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any; //NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authdata: AuthData = {
      email: email,
      password: password,
    };

    this.http
      .post('http://localhost:3000/api/user/signup', authdata)
      .subscribe((res) => {
        console.log(res);
      });
  }

  loginUser(email: string, password: string) {
    const authdata: AuthData = {
      email: email,
      password: password,
    };

    this.http
      .post<{ token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authdata)
      .subscribe( response => {
        console.log(response);
        const token = response.token;
        this.token = token;

        if (token) {
          const expInDuration = response.expiresIn;
          console.log(expInDuration);

          this.setAuthTimer(expInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }


      });
  }

  autoAuthDate(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }

    const now = new Date();
    const expInDuration = authInformation.expirationDate.getTime() - now.getTime();
    if(expInDuration > 0){
      this.setAuthTimer(expInDuration / 1000);

      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number){
    console.log('setting timer: '+duration);

    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);

  }


  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if ( !token || !expirationDate){
      return;
    }
    return {token: token, expirationDate: new Date(expirationDate)}
  }
}
