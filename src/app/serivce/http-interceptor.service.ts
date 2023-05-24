import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = sessionStorage.getItem("app.token");
    if (token) {
      req = req.clone({
        url: `http://localhost:8080/${req.url}`,
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        },
      });
    } else {
      req = req.clone({
        url: `http://localhost:8080/${req.url}`,
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
    );
  }

  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigateByUrl("/sign-in", { replaceUrl: true });
    }
    return throwError(() => error);
  }}
