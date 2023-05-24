import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
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
import {HttpInterceptorService} from "./serivce/http-interceptor.service";
import {PricingComponent} from './pricing/pricing.component';
import {TableComponent} from './table/table.component';
import {DetailsComponent} from './details/details.component';
import {UsersComponent} from './users/users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'table', component: TableComponent},
  {path: 'users/:id', component: UsersComponent},
  {path: 'pricing', component: PricingComponent, canActivate: [AuthGuard]},
  {path: 'table', component: TableComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard]}
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
    PricingComponent,
    TableComponent,
    DetailsComponent,
    UsersComponent
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
    NgxPaginationModule,
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
