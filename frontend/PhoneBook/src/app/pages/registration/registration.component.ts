import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email:string="";
  password:string="";
  passwordAgain:string="";

  registrationObj={};

  constructor(private crudService: CrudService){

  }

  handleRegistration(){
    this.registrationObj={
      email: this.email,
      password: this.password
    }
    if(this.password !== this.passwordAgain){
      console.log("The passwords does't match!");
    }
    else{
      this.crudService.submitCreateOwner(this.registrationObj).subscribe((result: any) => {
        console.log(result);
      });;
    }
    
  }

}
