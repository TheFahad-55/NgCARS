import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare const swal;
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  isLoading:boolean = false;
  reviews:{
    _id: string,
    feedback:string,
    stars:number,
    date:Date,
    carName:string,
    user:{
      _id:string,
      name:string,
    }
  }[]=[];
  
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
      this.isLoading=false;
      this.reviews=response.reviews;
    },err=>{
      this.isLoading=false;
      console.log(err);
      swal("Error", err.error.message, "error");
    });

  }
}
