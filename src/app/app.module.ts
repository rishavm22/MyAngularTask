import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './common/footer/footer.component';
import { SecondComponent } from './component/second/second.component';
import { ThirdComponent } from './component/third/third.component';
import { FirstChildComponent } from './component/first-child/first-child.component';
import { SecondChildComponent } from './component/second-child/second-child.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SecondComponent,
    ThirdComponent,
    FirstChildComponent,
    SecondChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
