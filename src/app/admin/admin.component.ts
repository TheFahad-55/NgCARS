import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricePredictor } from '../price-predictor/price-predictor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private pricePrediction:PricePredictor,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.pricePrediction.showHeader.next(false);
  }

  ngOnDestroy(){
    this.pricePrediction.showHeader.next(true);
  }

}
