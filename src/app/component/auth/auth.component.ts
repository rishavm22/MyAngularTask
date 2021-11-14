import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  title = "Please Login";
  logButton = "Login";
  ishide: boolean =true;
  loginMode: boolean =true;
  showPassIcon: string ='fa-eye-slash';
  // public user: User =  new User();
  constructor(private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    // this.user.uname =f.value.user_name;
    // this.user.password = f.value.password;
    // console.log(this.user);
    if(this.loginMode){

      getLogged(this.authService, this.router,f.value);
    }else {
      this.authService.register(f.value).subscribe(
        (response: User) => {
          if(response!=null&& response.uname== f.value.uname) {
            sessionStorage.setItem('currentUser', "true");
            this.router.navigate(['./home/first']).then(() => {
              window.location.reload();
            });
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  showPass() {
    this.ishide=!this.ishide;
  }

  loginModeSwitch() {
    this.loginMode = !this.loginMode;
    if(this.loginMode){
      this.title = "Please Login";
      this.logButton = "Login";
    }else {
      this.title = "Please Register";
      this.logButton = "SignIn";
    }
  }

}




function getLogged(authService: AuthService, router: Router, value: any) {
    authService.login(value).subscribe(
      (response: Boolean) => {
        if(response) {
          router.navigate(['./home/first']).then(() => {
            window.location.reload();
          });
          sessionStorage.setItem('currentUser', "true");
        }
        else alert("Login Failed");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

