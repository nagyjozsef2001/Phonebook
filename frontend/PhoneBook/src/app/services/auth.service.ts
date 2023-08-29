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
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('credentials', JSON.stringify(this.options));
        console.log(JSON.stringify(this.options));
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
