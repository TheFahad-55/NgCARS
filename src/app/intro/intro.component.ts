import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent  {
  constructor(private pricePrediction:PricePredictor,private router:Router) { 

  }

  ngOnInit(): void {
    this.pricePrediction.fixedNav.next(true);
  }

  ngOnDestroy(){
    this.pricePrediction.fixedNav.next(false); 
  }

  signUp(){
    this.router.navigate(['/signup'])
  }
  
}
