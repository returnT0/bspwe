import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { LoginFormDto } from "../login/login.component";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(loginForm: LoginFormDto): Observable<string> {
    const httpOptions = {
      headers: {
        Authorization: 'Basic ' + window.btoa(loginForm.username + ':' + loginForm.password)
      },
      responseType: 'text' as 'text',
    };
    return this.http.post("auth/sign-in", loginForm , httpOptions);
  }

  isUserAuthenticated(): boolean {
    return !!sessionStorage.getItem('app.token');
  }

  logout() {
    sessionStorage.removeItem('app.token');
    this.router.navigate(['sign-in']);
  }

}
