import { Component } from '@angular/core';
import { PricePredictor } from './price-predictor/price-predictor.service';
import {ChangeDetectorRef } from '@angular/core';

declare const M;
declare const AOS;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  


  showHeader:boolean = true;
  constructor(private pricePrediction:PricePredictor,private cdref: ChangeDetectorRef){}
  ngOnInit(){
    M.AutoInit();
    AOS.init();
    //Remove header
   this.pricePrediction.showHeader.subscribe((value)=>{
    this.showHeader=value;
       });
    }
    ngAfterContentChecked() {
      this.cdref.detectChanges();
    }
  title = 'NgCars';
}
