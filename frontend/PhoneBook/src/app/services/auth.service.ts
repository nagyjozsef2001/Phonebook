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
        // console.log(res);
        localStorage.setItem('authenticated', 'true'); //if we are logged in storing a true value here just to make authorization possible
        localStorage.setItem('credentials', JSON.stringify(this.options)); //saving the credentials, it needed if we want to be able to refresh the page without re login, to have better security we need to implenet jwt auth
        // console.log(JSON.stringify(this.options));
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  logout() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('credentials');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  getStoredCredentials(): any {
    const storedCredentials = localStorage.getItem('credentials');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  }
}
