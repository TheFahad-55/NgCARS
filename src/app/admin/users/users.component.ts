import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare const swal;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient) { 

  }
  isLoading:boolean = false;
  users:{
    _id: string,
    name: string,
    email: string,
    gender: string
  }[]=[];

  ngOnInit(): void {
    this.isLoading=true;
    this.http.get<{users:{
      _id: string,
      name: string,
      email: string,
      gender: string
    }[]}>('http://localhost:3000/api/admin/users')
    .subscribe((response)=>{
      this.isLoading=false;
      this.users=response.users;
    },err=>{
      this.isLoading=false;
      console.log(err);
      swal("Error", err.error.message, "error");
    });

  }
  //Delete User...
  onDeleteUser(id:string){
    //Delete from ui..
    let user=this.users.find((user)=>{
    return user._id===id;
   });
    this.users= this.users.filter((value)=>value!=user);

    this.http.delete<{message:string}>(`http://localhost:3000/api/admin/users/${id}`)
    .subscribe((response)=>{
      swal("", "User Removed!", "success");
    },err=>{
        this.isLoading=false;
        console.log(err);
        swal("Error", err.error.message, "error");
    });

  }

}
