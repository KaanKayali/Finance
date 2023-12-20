import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, } from '@angular/forms';
import { AuthService, Credential } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router: Router, public authService: AuthService) {

  }
  title = "Register";

  credentails?: Credential
  
  Register(registerForm:NgForm){
    if (registerForm && registerForm.valid && registerForm.value.confirmpassword === registerForm.value.password) {
      this.authService.register({firstname: registerForm.value.firstname, lastname: registerForm.value.lastname, login: registerForm.value.username, password: registerForm.value.password})
      .subscribe({
        next: x => {
          this.authService.login({login: registerForm.value.username, password: registerForm.value.password})
          .subscribe({
            next: cred => {
              localStorage.setItem("JWT", cred.token);
              this.router.navigate(["/dashboard"]);
            },
            error: e => {
              console.log(e);
            }
          });

        }
      });
    }
  }
}
