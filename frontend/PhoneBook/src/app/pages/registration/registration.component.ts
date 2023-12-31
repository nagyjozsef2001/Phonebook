import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private crudService: CrudService, private router:Router){
  }

  handleRegistration(){
    this.registrationObj={
      email: this.email,
      password: this.password
    }
    if(this.password !== this.passwordAgain){ //checing if the passwords are matching
      console.log("The passwords does't match!");
    }
    else{
      this.crudService.submitCreateOwner(this.registrationObj).subscribe((result: any) => {
        console.log(result);
      });;
      this.router.navigate(['/login']); 
    }
    
  }

}
