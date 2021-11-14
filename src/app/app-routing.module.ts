import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { FirstChildComponent } from './component/first-child/first-child.component';
import { HomeComponent } from './component/home/home.component';
import { SecondChildComponent } from './component/second-child/second-child.component';
import { SecondComponent } from './component/second/second.component';
import { ThirdComponent } from './component/third/third.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'login' , component: AuthComponent },
  { path: 'home' , component: HomeComponent,
    children: [
        { path: '' , redirectTo: 'first', pathMatch: 'full' },
        { path: 'first', component: FirstChildComponent},
        { path: 'second', component: SecondChildComponent},
    ]
  },
  { path: 'second' , component: SecondComponent},
  { path: 'third' , component: ThirdComponent, canActivate: [RouteGuardService] },
  // { path: '**' , component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
