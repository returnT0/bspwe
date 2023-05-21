import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface LoginFormDto {
  username: string,
  password: string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin?: boolean;
  url = "https://localhost:44379/api/auth/";

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
  }

  public login = (form: NgForm) => {
    this.router.navigate(["profile"]);
    // const credentials = JSON.stringify(form.value);
    // this.http.post(this.url + "login", credentials, {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //   })
    // }).subscribe(response => {
    //   const token = (<any>response).token;
    //   localStorage.setItem("jwt", token);
    //   this.invalidLogin = false;
    //   this.router.navigate(["profile"]);
    // }, err => {
    //   this.invalidLogin = true;
    //   setTimeout(() => {
    //     this.invalidLogin = false;
    //   }, 2000);
    // });

  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}

