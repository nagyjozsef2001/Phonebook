import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }

  getAllContacts():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/contacts");
  }

  modifyContact(id:number,obj:any):Observable<any>{
    return this.http.put<any>(`http://localhost:3000/contacts/${id}`, obj);
  }

  submitCreate(obj:any){
    return this.http.post<any>(`http://localhost:3000/contacts`, obj);
  }

  deleteContact(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/contacts/${id}`);
  }
}
