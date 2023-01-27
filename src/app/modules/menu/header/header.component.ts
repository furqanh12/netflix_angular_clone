import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-redux/appState';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';

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

  count$ = this.store.select(state => state.count);

  url: any
  token: any
  nav:any
  show =['login','signup','plan','']
  constructor(private router:Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'signup'}))
    console.log(this.count$,"$");
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
