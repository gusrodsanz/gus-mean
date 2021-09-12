import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private authServ: AuthService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken  = this.authServ.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken) //"Bearer "+
    });

    return next.handle(req);
  }

}
