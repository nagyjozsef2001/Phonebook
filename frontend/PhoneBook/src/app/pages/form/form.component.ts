import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';

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
    notes: new FormControl('')
  });

  task:string="";

  createContact:any = {};

  constructor(private crudService: CrudService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.task=params["phone"];
    });
  }

  operationType(){
    if(this.task === "post"){
      this.submitCreate();
    }
    else{
      this.submitUpdate();
    }
  }

  submitUpdate(){
    this.crudService.submitUpdate(this.applyForm.value.phoneNumber ?? '',
    this.applyForm.value.firstName ?? '',
    this.applyForm.value.lastName ?? '',
    this.applyForm.value.email ?? '',
    this.applyForm.value.notes ?? ''
    );
  }

  submitCreate(){
    this.createContact = {
      phoneNumber:this.applyForm.value.phoneNumber ?? '',
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? '',
      notes: this.applyForm.value.notes ?? ''
    }
    console.log(this.createContact);
    this.crudService.submitCreate(this.createContact).subscribe((result: any) => {
      console.log(result);
    });;

  }
}

