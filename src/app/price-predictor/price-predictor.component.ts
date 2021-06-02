import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricePredictor } from './price-predictor.service';
declare const M;
declare const swal;

@Component({
  selector: 'app-price-predictor',
  templateUrl: './price-predictor.component.html',
  styleUrls: ['./price-predictor.component.scss']
})
export class PricePredictorComponent implements OnInit {
isLoading:boolean=false;
price:number=null;
stars:number=null;
carName:string=" ";
  constructor(private http:HttpClient,private router:Router
    ,private pricePrediction: PricePredictor) { 
    
  }
  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
    this.displayData();
     
  }

  //Get Price..
  onPredictPrice(company,model,myear,city,mileage,color,
    assembly,transmission,etype,ecapacity,cruiseControl,powerMirrors,
    airConditioner,powerSteering,powerLocks,powerWindows,immobilizerKey,abs,sunRoof,
    alloyRims,airBags){

      //validation of Inputs or features...
      if(company.value===""||!company.value){
        swal("", "Please Choose Company Name", "warning");
        company.focus();
        return;
      }
      if(model.value===""||!model.value){
        swal("", "Please Choose Model Name", "warning");
        model.focus();
        return;
      }
      if(myear.value===""||!myear.value){
        swal("", "Please Choose Model Year", "warning");
        myear.focus();
        return;
      }
      if(city.value===""||!city.value){
        swal("", "Please Choose Registered City", "warning");
        city.focus();
        return;
      }
      if(mileage.value===""||!mileage.value){
        swal("", "Please Enter Mileage", "warning");
        mileage.focus();
        return;
      }
      if(color.value===""||!color.value){
        swal("", "Please Choose Color", "warning");
        color.focus();
        return;
      }
      if(assembly.value===""||!assembly.value){
        swal("", "Please Choose Assembly", "warning");
        assembly.focus();
        return;
      }
      if(transmission.value===""||!transmission.value){
        swal("", "Please Choose Transmission", "warning");
        transmission.focus();
        return;
      }
      if(etype.value===""||!etype.value){
        swal("", "Please Choose Engine Type", "warning");
        etype.focus();
        return;
      }
      if(ecapacity.value===""||!ecapacity.value){
        swal("", "Please Choose Engine Capacity", "warning");
        ecapacity.focus();
        return;
      }
      this.carName=company.value+" "+model.value;
      
      //Sending Request To Node.    
      this.isLoading=true;
      this.http.post<{price:number}>('http://localhost:3000/python/sendCarData',{
        user_company:company.value,
        user_transmission:transmission.value,
        user_assembly:assembly.value,
        user_color:color.value,
        user_ecapacity:ecapacity.value,
        user_etype:etype.value,
        user_mname:model.value,
        user_myear:myear.value,
        user_mileage:mileage.value,
        user_regcity:city.value,
        user_cruisecontrol:cruiseControl.checked,
        user_airbags:airBags.checked,
        user_airconditioning:airConditioner.checked,
        user_alloyrims:alloyRims.checked,
        user_powerlocks:powerLocks.checked,
        user_powersteering:powerSteering.checked,
        user_powerwindows:powerWindows.checked,
        user_sunroof:sunRoof.checked,
        user_powermirrors:powerMirrors.checked,
        user_immobilizerkey:immobilizerKey.checked,
        user_abs:abs.checked,

      }).subscribe((price)=>{
          this.isLoading=false;
          this.price=price.price;

        //Intitlialize and open  Modal For Price...
        let elem = document.querySelector('.modal');
        let instances = M.Modal.init(elem,{
        onCloseEnd:()=>{
          this.displayData();
          console.log('modal closed');
        }
      });
      let instance = M.Modal.getInstance(elem);
      instance.open();
     },err=>{
        this.isLoading=false;
        swal("Error", err.error.message, "error");
     });

    }

    //Adding Review........
    onReview(feedback){
      
    swal('Loading..');
    this.pricePrediction.addReview(feedback,this.stars,this.carName).subscribe((response)=>{
        this.stars=null;
        feedback.value=null;
        this.displayData();
        swal("", "Review Added Successfully!", "success");
      },err=>{
        console.log(err);
        // swal("Error", err.error.message, "error");
      });
      }

    //Remove Review....
    onRemoveReview(feedback){
      this.displayData();
      this.stars=null;
      feedback.value=null;
    }

    //Getting Stars From User....
    starOne(){
      this.stars=1;
    }
    starTwo(){
      this.stars=2;
    }
    starThree(){
      this.stars=3;
    }
    starFour(){
      this.stars=4;
    }
    starFive(){
      this.stars=5;
    }

    ngOnDestroy(){
      this.pricePrediction.navColor.next('#9bcde5');
    }

    //Display Data...
    displayData(){
      this.http.get<{
        assembly:[string],
        cities:[string],
        colors:[string],
        company:[string],
        ecapacity:[string],
        etype:[string],
        models:[string],
        myear:[number],
        transmission:[string]
  
      }>('http://localhost:3000/data')
      .subscribe((response)=>{
        console.log(response);
        
        //CONVERTING ARRAY RESPONSE INTO OBJECT FIRST AND THEN ASSIGNING IT TO INPUTS......
        //company
        const obj = response.company.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.company');
        var instances = M.Autocomplete.init(elems, {
        data:obj
        });
  
        //models...
        const obj1 = response.models.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.model');
        var instances = M.Autocomplete.init(elems, {
        data:obj1
        });
  
        //model year
        const obj2 = response.myear.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.myear');
        var instances = M.Autocomplete.init(elems, {
        data:obj2
        });
  
        //city 
        const obj3 = response.cities.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.city');
        var instances = M.Autocomplete.init(elems, {
        data:obj3
        });
  
        //color
        const obj4 = response.colors.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.color');
        var instances = M.Autocomplete.init(elems, {
        data:obj4
        });
  
        //assembly
        const obj5 = response.assembly.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.assembly');
        var instances = M.Autocomplete.init(elems, {
        data:obj5
        });
  
        //transmission
        const obj6 = response.transmission.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.transmission');
        var instances = M.Autocomplete.init(elems, {
        data:obj6
        });
  
        //engine type
        const obj7 = response.etype.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.etype');
        var instances = M.Autocomplete.init(elems, {
        data:obj7
        });
  
        //engine capacity
        const obj8 = response.ecapacity.reduce((accumulator, currentValue) => {
          accumulator[currentValue] = null;
          return accumulator;
        }, {});
        var elems = document.querySelector('.ecapacity');
        var instances = M.Autocomplete.init(elems, {
        data:obj8
        });
    
      },err=>{
          console.log(err);
      });
    }

}
