import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{


  applyForm = new FormGroup({
    phoneNumber: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    notes: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(''),
    shire: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(''),
    stairs: new FormControl(''),
    floor: new FormControl(''),
    apartment: new FormControl('')
  });

  task:any="";

  createContact:any = {};

  addressContact:any = {};

  constructor(private crudService: CrudService, private route: ActivatedRoute, private redirect:Router){
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.task=params["contactId"];
    });
  }

  operationType(){
    if(this.task === "post"){
      this.submitCreate();
    }
    else{
      this.submitUpdate();
    }
    this.redirect.navigate(['/']);
  }

  submitUpdate(){
    this.initialize_contact_obj();
    this.crudService.modifyContact(this.task,this.createContact).subscribe((result: any) => {
      console.log(result);
  });;
}

  submitCreate(){
    this.initialize_contact_obj();
    this.crudService.submitCreate(this.createContact).subscribe((result: any) => {
      console.log(result);
    });;

  }

  initialize_contact_obj(){
    this.createContact = {
      phoneNumber:this.applyForm.value.phoneNumber ?? '',
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? '',
      notes: this.applyForm.value.notes ?? ''
    }
    this.addressContact = {
      country: this.applyForm.value.country ?? '',
      postalCode: this.applyForm.value.postalCode ?? '',
      shire: this.applyForm.value.shire ?? '',
      city: this.applyForm.value.city ?? '',
      street: this.applyForm.value.street ?? '',
      number: this.applyForm.value.number ?? '',
      stairs: this.applyForm.value.stairs ?? '',
      floor: this.applyForm.value.floor ?? '',
      apartment: this.applyForm.value.apartment ?? ''
    }
    this.createContact.address = this.addressContact;
  }
}

