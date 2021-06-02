import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PricePredictor{

  public navColor=new BehaviorSubject<string>('#9bcde5');
  public fixedNav=new BehaviorSubject<boolean>(false);
  public showHeader=new BehaviorSubject<boolean>(true);

  constructor(private http:HttpClient){

  }

  addReview(feedback,stars,carName){
    let feedback1;
      if(feedback.value)
      {
        feedback1 = feedback.value;

      }
      else{
        feedback1=" ";
      }
    return this.http.post<{message: string}>('http://localhost:3000/api/reviews',{
        
      stars:stars,
      feedback:feedback1,
      carName:carName});

  }

}