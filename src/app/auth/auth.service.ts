import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authdata: AuthData = {
      email: email,
      password: password
    };

    this.http.post("http://localhost:3000/api/user/signup", authdata)
    .subscribe(res => {
      console.log(res);
    });
  }

  loginUser(email: string, password: string){
    const authdata: AuthData = {
      email: email,
      password: password
    };

    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authdata)
    .subscribe(res => {
      console.log(res);
      const token = res.token;
      this.token = token;
      this.authStatusListener.next(true);
    });
  }



}
