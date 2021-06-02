import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';
declare const swal;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
isLoading:boolean=false;
token:string=null;
confirmPassword:boolean=false;
  constructor(private pricePrediction:PricePredictor,private http:HttpClient,private router:Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
    //Getting token from the url...
    this.activatedRoute.params.subscribe((params)=>{
      this.token=params['token'];

    });
    
  }
//reset password
  onResetPassword(form:NgForm) {
if(form.value.password!==form.value.rpassword){
  this.confirmPassword=true;
  return;
}
this.confirmPassword=false;
this.isLoading=true;
this.http.put<{token: string}>(` http://localhost:3000/api/auth/forgot-password/${this.token}`,{
  password:form.value.password,
  
}).subscribe((response)=>{
  this.isLoading=false;
  swal("", "Successfully Updated Your Password", "success");
  this.router.navigate(['/login']);

},err=>{
  this.isLoading=false;
  console.log(err);
  swal("Error", err.error.message, "error");
});


  }
  ngOnDestroy(){
    this.pricePrediction.navColor.next('#9bcde5');
  }
  

}
