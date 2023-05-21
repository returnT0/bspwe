import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe, NgFor, NgOptimizedImage} from "@angular/common";
import {FooterComponent} from './footer/footer.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./serivce/auth.service";
import {HttpInterceptorService} from "./serivce/http-interceptor.service";
import {DomainsComponent} from './domains/domains.component';
import {AboutComponent} from './about/about.component';
import {TableComponent} from './table/table.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'domains', component: DomainsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'table', component: TableComponent},
  {path: 'details/:id', component: DetailsComponent}
];

function tokenGetter() {
  return sessionStorage.getItem("app.token")
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    ProfileComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    DomainsComponent,
    AboutComponent,
    TableComponent,
    DetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgFor, DecimalPipe,
    NgOptimizedImage,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
