import { Component } from '@angular/core';
import {AuthService} from "../serivce/auth.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private authService: AuthService
  ) {
  }

  public logout = () => {
    this.authService.logout();
  }

}
