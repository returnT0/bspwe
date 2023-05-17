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
        url: `http://localhost:8087/${req.url}`,
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
    } else {
      req = req.clone({
        url: `http://localhost:8087/${req.url}`,
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
    );
  }

  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigateByUrl("/login", { replaceUrl: true });
    }
    return throwError(() => error);
  }}
