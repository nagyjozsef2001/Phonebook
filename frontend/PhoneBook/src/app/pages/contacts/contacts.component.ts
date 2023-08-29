import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  contactList: any [] = [];

  searchText: string = '';

  searchType: string = 'byName';

  constructor(private crudService: CrudService, private router:Router, private authservice:AuthService){
  }

  ngOnInit(): void {
    this.loadAllContacts();
  }

  loadAllContacts(){
    this.crudService.getAllContacts().subscribe((result:any) => {
      this.contactList = result;
    })
  }

  deleteAContact(id:number){
    this.crudService.deleteContact(id).subscribe((result) =>{
      console.log(result);
    });
    location.reload();
  }

  openModify(id:number) {
    this.router.navigate(['/form'], {queryParams: {contactId:id}});

  }

  createContact(){
    this.router.navigate(['/form'], { queryParams : { contactId: 'post' }});
  }

  onSearchTextEntered(searchValue: string){
    this.searchText=searchValue;
  }

  onSearchTypeChanged(text: string){
    this.searchType=text;
  }
  
}
