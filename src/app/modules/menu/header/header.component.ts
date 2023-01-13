import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url: any
  token: any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    console.log(this.token)
  }
  
  signIn(){
    console.log(this.url = localStorage.getItem('Url'))
    this.router.navigateByUrl('login')
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }

}
