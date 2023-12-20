import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, Credential } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, public authService: AuthService) {

  }
  title = "User Data";

  credentails?: Credential
  
  Login(userForm:NgForm){
    //Validate login
    if (userForm && userForm.valid) {
      //Login versuchen provided credentials
      this.authService.login({login: userForm.value.username, password: userForm.value.password})
      .subscribe({
        next: cred => {
          this.credentails = cred;
          localStorage.setItem("JWT", cred.token);
          this.router.navigate(["/dashboard"]);
        },
        error: e => {
          console.log(e);
        }
      });
 
    }
  }
}


