import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const M;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  

  constructor(private router:Router) { 
    
  }

  ngOnInit(): void {
    
  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
