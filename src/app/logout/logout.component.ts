import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { 
    
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.loginService.loggedIn.next(false);
    this.router.navigate(['/login']);
    
  }

}
