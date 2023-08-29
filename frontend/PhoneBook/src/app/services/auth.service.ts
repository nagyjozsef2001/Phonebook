import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  options = {
  };

  constructor(private http:HttpClient) { }

  login(username: string, password: string):Observable<any> {
    this.options={
      headers: { authorization: this.createBasicAuthToken(username, password) },
      withCredentials: true 
    };
    return this.http.get( "http://localhost:3000/login",this.options).pipe(map((res) => {
        this.registerSuccessfulLogin(username, password);
        console.log(res);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    localStorage.setItem('authenticatedUser', username);
    console.log("setting up session");
  }
}
