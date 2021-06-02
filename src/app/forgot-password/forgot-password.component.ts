import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';
declare const swal;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading:boolean = false;
  constructor(private pricePrediction:PricePredictor,private http:HttpClient,private router:Router) { 

  }

  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
    
  }

  onForgotPassword(form:NgForm){
    this.isLoading=true;
    this.http.post<{message: string}>('http://localhost:3000/api/auth/forgot-password',{
      email:form.value.email,
    }).subscribe((response)=>{
      this.isLoading=false;
      swal("", "We have sent you recover link through email, please check.", "success");
    },err=>{
      this.isLoading=false;
      console.log(err);
      swal("Error", err.error, "error");
    });
  }
  
  ngOnDestroy(){
    this.pricePrediction.navColor.next('#9bcde5');
  }

}
