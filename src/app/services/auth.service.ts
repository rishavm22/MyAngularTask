import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl= environment.apiBaseUrl;




  constructor(private http: HttpClient) { }

  public login(currentUser: User): Observable<Boolean> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }


    return this.http.post<Boolean>(`${this.apiServerUrl}/auth/login`, JSON.stringify(currentUser), httpOptions);
  }

  public register(currentUser: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<User>(`${this.apiServerUrl}/auth/register`, currentUser, httpOptions);
  }

  isUserLogged(): Boolean {
    let cUser = sessionStorage.getItem('currentUser');
    if(cUser!=null) return true;
    return false;
  }

  // executeJWTAuthBeanService(email: string, password: string, username: string) {
  //   // let basicAuthHeaderString = 'Basic '+window.btoa(name +':'+ password);

  //   // let headers = new HttpHeaders({
  //   //   Authorization: (basicAuthHeaderString==null)?'':basicAuthHeaderString,
  //   // }) ;
  //   return this.http.post<any>(`${API_URL}/authenticate`,
  //   {
  //     username,
  //     password
  //   }
  //   ).pipe(
  //     map(
  //       data=> {
  //         sessionStorage.setItem('currentUser',username);
  //         sessionStorage.setItem('token', `Bearer ${data.token}`);
  //         return data;
  //       }
  //     )
  //   );
  // }

  getAuthenticatedUser() {
    return sessionStorage.getItem('currentUser');
  }
}
