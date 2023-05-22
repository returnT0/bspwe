import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  showError: boolean | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });
    // this.registerForm.get('confirm')?.setValidators([Validators.required,this.passConfValidator.validateConfirmPassword(this.registerForm?.get('password'))]);
  }

  signUp(registrationForm: NgForm) {

    const form = registrationForm as any;

    const user: UserForRegistrationDto = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      username: form?.username,
      password: form?.password,
    };

    this.http.post("auth/sign-up", JSON.stringify(user))
      .subscribe({
        next: _ => this.router.navigate(['/sign-in']),
      });
  }

  public validateControl = (controlName: string) => {
    return this.registrationForm?.get(controlName)?.invalid && this.registrationForm?.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm?.get(controlName)?.hasError(errorName)
  }

}

interface UserForRegistrationDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

