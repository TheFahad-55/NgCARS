import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare const swal;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isLoading:boolean = false;
  rating:number;

  constructor(private http:HttpClient) { 

  }

  ngOnInit(): void {
    this.isLoading=true;
    this.http.get<{reviews:{
      _id: string,
      feedback:string,
      stars:number,
      carName:string,
      date:Date,
      user:{
        _id:string,
        name:string,
      }
    }[]}>('http://localhost:3000/api/admin/reviews')
    .subscribe((response)=>{
      console.log(response);
      let totalStars=0;
      this.isLoading=false;
      response.reviews.map((review)=>{
        totalStars=totalStars+review.stars;
      });
     let average=totalStars/response.reviews.length;
     this.rating=average;
      
    },err=>{
      console.log(err);
      swal("Error", err.error.message, "error");
      this.isLoading=false;
    });
  }

}
