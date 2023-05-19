import {Component, Output} from '@angular/core';
//FIXME: import configurl from '../../assets/config.json';
// ATTENTION: nejebu kak sdelat import configurl bez ts-ignore i oshibki
// @ts-ignore
import configurl from '../../assets/config.json';
import {AuthService} from "../serivce/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  //FIXME: "/api/authentication/"
  private readonly baseUrl: string = configurl.apiServer.url + "/api/authentication/"

  @Output()
  public user: AuthUserDto = new AuthUserDto();
  
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
  }


  public ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.httpClient.get<AuthUserDto>(this.baseUrl + "my-profile")
      .subscribe(response => this.user = response);
  }

  public update(user?: AuthUserDto): void {

  }

}

export class AuthUserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  role?: string;
}
