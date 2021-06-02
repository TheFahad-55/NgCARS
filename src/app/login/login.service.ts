import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  token=localStorage.getItem('token');
  public loggedIn;

  constructor() {
    if(this.token){
      this.loggedIn=new BehaviorSubject(true);
    }
    else {
      this.loggedIn=new BehaviorSubject(false);
    } 
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
