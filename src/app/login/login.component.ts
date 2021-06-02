import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';
import { LoginService } from './login.service';
declare const swal;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading:boolean = false;
  constructor(private pricePrediction:PricePredictor,private http:HttpClient,private router:Router,
    private loginService:LoginService) { 

    }

  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
    
  }

  ngOnDestroy(){
    this.pricePrediction.navColor.next('#9bcde5');
  }

  onValidateUser(form:NgForm){
  
    this.isLoading=true;
    this.http.post<{token: string,isAdmin?:boolean}>('http://localhost:3000/api/auth',{
      email:form.value.email,
      password:form.value.password,
      
    }).subscribe((response)=>{
            this.isLoading=false;
      if(response.isAdmin){
        localStorage.setItem("token",response.token.toString());
        swal("", "Successfully Logged In", "success");
        return this.router.navigate(['/admin/home']);

      }

      swal("", "Successfully Logged In", "success");
      localStorage.setItem('token',response.token.toString());
      this.loginService.loggedIn.next(true);
      this.router.navigate(['/price-predictor']);

    },err=>{
      this.isLoading=false;
      swal("Error", err.error.message, "error");
    });

  }

}
