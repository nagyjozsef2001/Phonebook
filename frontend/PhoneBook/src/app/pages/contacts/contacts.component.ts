import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  contactList: any [] = [];

  searchText: string = '';

  searchType: string = 'byName';

  constructor(private crudService: CrudService, private router:Router){
  }

  ngOnInit(): void {
    this.loadAllContacts();
  }

  loadAllContacts(){
    this.crudService.getAllContacts().subscribe((result:any) => {
      this.contactList = result;
    })
    console.log("meghivva");
  }

  deleteAContact(phoneNumber:string){
    this.crudService.deleteContact(phoneNumber).subscribe((result) =>{
      console.log(result);
    });
    location.reload();
  }

  openFormInNewWindow(phoneNumber: string) {
    this.router.navigate(['/form'], { queryParams : { phone: phoneNumber } }); 
  }

  onSearchTextEntered(searchValue: string){
    this.searchText=searchValue;
  }

  onSearchTypeChanged(text: string){
    this.searchType=text;
  }
  
}
