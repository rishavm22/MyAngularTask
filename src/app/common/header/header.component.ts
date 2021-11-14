import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogged: Boolean = false;
  timerOn: boolean = false;
  min= 15;
  sec=0;
  private subscription?: Subscription;
  constructor(private router: Router,private authServive: AuthService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("min")!=null&& sessionStorage.getItem("sec")!=null){
      this.min = +sessionStorage.getItem("min")!!;
      this.sec = +sessionStorage.getItem("sec")!!;

    }

    this.isLogged=this.authServive.isUserLogged();
    if(sessionStorage.getItem("timer")=="On") this.timerOn=true;
    if(this.min<15)this.timerOn=false
    if(this.isLogged&&!this.timerOn){
      sessionStorage.setItem("timer","On");
      this.subscription = interval(1000)
           .subscribe(x => {
             if(this.sec!=0){
                this.sec-=1;
                this.setTimer();
             } else if(this.sec==0&& this.min!=0){
                this.min-=1;
                this.sec=59;
                this.setTimer();
             }else if(this.min==0&&this.sec==0){
               this.logout();
             }
            });
    }
  }

  logout() {
    sessionStorage.clear();
    this.isLogged=false;
    this.min=15;
    this.sec=0;
    this.router.navigate(['./home/first']).then(() => {
      window.location.reload();
    });
  }
  setTimer() {
    sessionStorage.setItem("min", this.min.toString());
    sessionStorage.setItem("sec", this.sec.toString());
  }

}
