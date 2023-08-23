import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  updatedContact:any = {
    "phoneNumber": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "notes": null
  }

  constructor(private http:HttpClient) { }

  getAllContacts():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/contacts");
  }

  modifyContact(phoneNumber: string,obj:any):Observable<any>{
    console.log("put");
    return this.http.put<any>(`http://localhost:3000/contacts/${phoneNumber}`, obj);
  }

  submitUpdate(phoneNumber: string, firstName: string, lastName: string, email:string, notes: string){
    this.updatedContact.phoneNumber=phoneNumber;
    this.updatedContact.firstName=firstName;
    this.updatedContact.lastName=lastName;
    this.updatedContact.email=email;
    this.updatedContact.notes=notes;
    this.modifyContact(phoneNumber, this.updatedContact).subscribe((result: any) => {
    });
  }

  submitCreate(obj:any){
    return this.http.post<any>(`http://localhost:3000/contacts`, obj);
  }

  deleteContact(phoneNumber:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/contacts/${phoneNumber}`);
  }
}
