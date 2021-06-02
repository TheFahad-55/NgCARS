import { Component, OnInit } from '@angular/core';
import { PricePredictor } from '../price-predictor/price-predictor.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private pricePrediction:PricePredictor) { 
    
  }

  ngOnInit(): void {
    this.pricePrediction.navColor.next('#fff');
    this.pricePrediction.fixedNav.next(false);
  }

  ngOnDestroy(){
    this.pricePrediction.navColor.next('#9bcde5');
  }

}
