import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any
declare global {
  interface Window {
      nav:any;
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url: any
  token: any
  nav:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    document.getElementById("#second-header");
    window.addEventListener("scroll", (e) =>{
      if(window.pageYOffset > 0){
        $(".second-header").addClass("dark-header")
      }
      else{
        $(".second-header").removeClass("dark-header")
      }
    })

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
