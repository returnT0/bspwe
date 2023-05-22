import { Component, Output } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, NgForm } from '@angular/forms';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthService} from "../serivce/auth.service";

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

  @Output()
  public invalidLogin?: boolean;
  loginForm: FormGroup | undefined;
  showError: boolean | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {
  }

  public login(loginForm: NgForm): void {
    const values = loginForm.value as any;
    this.showError = false;

    const loginFormDto: LoginFormDto = {
      username: values.username,
      password: values.password
    }
    sessionStorage.removeItem("app.token");
    this.authService.login(loginFormDto)
      .subscribe({
        next: (token) => {
          sessionStorage.setItem("app.token", token);
          const decodedToken = jwtDecode<JwtPayload>(token);
          if (typeof decodedToken.aud === "string") {
            sessionStorage.setItem("app.roles", decodedToken.aud);
          }
          //todo: add domain resolution
          this.invalidLogin = false;
          this.router.navigateByUrl("/home");
        },
        error: (error) => {
          this.invalidLogin = true;
          console.error(`Login failed: ${error.status}`, "OK")
        }
      });
  }

  isUserAuthenticated() {
    const token = sessionStorage.getItem("jwt");
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

}

export interface LoginFormDto {
  username: string,
  password: string
}

