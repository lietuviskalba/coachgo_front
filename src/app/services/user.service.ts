import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // theToken: string;
  isLoggedIn = false;
  // too lazy to make share same url :(((
  // readonly USERS_URL = 'http://localhost:3000/api/register';
  // readonly USERS_URL_login = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    this.http.post<User>(environment.USERS_URL, user, httpOptions);
    return this.http.post<User>(environment.USERS_URL, user, httpOptions);
  }
  login(user: User) {
    // localStorage.clear();
    // this.http.post<User>(environment.USERS_URL_login, user, httpOptions).subscribe((answer) => (
      // this.theToken = answer.token
      // localStorage.setItem('token', answer.token),
      // localStorage.setItem('userId', answer.userId)
      //  ));
    return this.http.post<User>(environment.USERS_URL_login, user, httpOptions);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // getToken() {
  //   return this.theToken;
  // }


}
