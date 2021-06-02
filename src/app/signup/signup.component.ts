import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';
declare const swal;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading:boolean = false;

  constructor(private pricePrediction:PricePredictor
    ,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
    
  }
  onRegisterUser(form:NgForm){
    let gender;
    if(form.value.male===true){
      gender="male";
    }
    if(form.value.female===true){
      gender="female";
    }
    this.isLoading=true;
    this.http.post<{message: string}>('http://localhost:3000/api/users',{
      name:form.value.name,
      email:form.value.email,
      password:form.value.password,
      gender:gender
      
    }).subscribe((response)=>{
      this.isLoading=false;
      swal("", response.message, "success");
      this.router.navigate(['/login']);

    },err=>{
      this.isLoading=false;
      swal("Error", err.error.message, "error");
    });

    

  }
  ngOnDestroy(){
    this.pricePrediction.navColor.next('#9bcde5');
  }


}
