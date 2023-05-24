import {Component, Output} from '@angular/core';
//FIXME: import configurl
// @ts-ignore
import configurl from '../../assets/config.json';
import {AuthService} from "../serivce/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

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

  infoForm!: FormGroup;

  public ngOnInit() {
    this.getUser();

    const namesRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z]).{2,22})\S$/;

    this.infoForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(namesRegex)]),
      confirm: new FormControl('')
    });
  }

  getUser(): void {
    this.httpClient.get<AuthUserDto>(this.baseUrl + "profile")
      .subscribe(response => this.user = response);
  }

  public update(user?: AuthUserDto): void {

  }

  public isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

}

export class AuthUserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
}
