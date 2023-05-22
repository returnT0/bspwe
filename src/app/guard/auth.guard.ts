import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!sessionStorage.getItem('app.token')) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return !!sessionStorage.getItem("app.token");
  }

}
