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
    
    if(this.authservice.isAuthenticated()){ //if we have logged in then load the user account
      this.authservice.options=this.authservice.getStoredCredentials();
      this.loadAllContacts();
    }
  }

  loadAllContacts(){ //to get all the contacts
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

  openModify(id:number) { //if we want to modify a contact then we need to go to forms component
    this.router.navigate(['/form'], {queryParams: {contactId:id}});

  }

  createContact(){//if we want to create a contact then we need to go to forms component
    this.router.navigate(['/form'], { queryParams : { contactId: 'post' }});
  }

  onSearchTextEntered(searchValue: string){ //the searchbar uses it, this is what we type in the searchbar
    this.searchText=searchValue;
  }

  onSearchTypeChanged(text: string){ ////the searchbar uses it, this is the option we select
    this.searchType=text;
  }
  
}
