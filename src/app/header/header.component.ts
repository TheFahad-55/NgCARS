import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { PricePredictor } from '../price-predictor/price-predictor.service';
declare const M;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navWhite: boolean = false;
  navColor: string ;
  fixedNav:boolean = false;
  isLogin:boolean=false;

  constructor(private pricePrediction: PricePredictor,private loginService:LoginService) { 

    //checking login
    this.loginService.loggedIn.subscribe((value)=>{
    this.isLogin=value;
 
    });
  }

  ngOnInit(): void {
    //Header
    var elems = document.querySelector('.sidenav');
    var instances = M.Sidenav.init(elems);
    
    window.addEventListener("scroll", (event) => {
      let scroll = window.scrollY;
      if(scroll>0){
        this.navWhite=true;
      }
      else{ 
        this.navWhite=false;
      }
  });
   
    this.pricePrediction.navColor.subscribe((color)=>{
    this.navColor=color;
    });

    //Subjects
    this.pricePrediction.fixedNav.subscribe((color)=>{
    this.fixedNav=color;
      });
      
  
  }
  

}
