import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient, private authService: AuthService) { }

  getAllContacts():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/contacts", this.authService.options);
  }

  modifyContact(id:number,obj:any):Observable<any>{
    return this.http.put<any>(`http://localhost:3000/contacts/${id}`, obj, this.authService.options);
  }

  submitCreate(obj:any){
    return this.http.post<any>(`http://localhost:3000/contacts/createContact`, obj, this.authService.options);
  }

  deleteContact(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/contacts/${id}`, this.authService.options);
  }
  
}
