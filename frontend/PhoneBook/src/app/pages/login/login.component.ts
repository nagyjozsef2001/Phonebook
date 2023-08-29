import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username:string="";
  password:string="";
  errorMessage:string = "Invalid Credentials";
  successMessage: string = "";
  invalidLogin:boolean = false;
  loginSuccess:boolean = false;

  constructor(private authservice:AuthService, private router:Router){
  }

  ngOnInit(): void {
  }

  handleLogin(){
    this.authservice.login(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = "Login Successful";
      console.log(this.successMessage);
      console.log(result);
      localStorage.setItem('authenticated', 'true');
    }, (error) =>{
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.errorMessage = "Invalid Credentials";
      console.log(this.errorMessage);
      console.log(error);
    });
    this.router.navigate(['/contacts']);  
  }
  

}
