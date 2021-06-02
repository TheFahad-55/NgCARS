import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService) { }
  intercept(request:HttpRequest<any>,next:HttpHandler){
    const token=this.loginService.getToken();
    if(token){
      request=request.clone({
        setHeaders:{'x-auth':token}
      });
      console.log(request);
      console.log(token);

    }
    return next.handle(request);


  }
}
