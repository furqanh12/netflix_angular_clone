import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-redux/appState';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import { SocketIoService } from '../../../services/socket-io.service'

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

  moviesNotifications: Array<{}>
  url: any
  token: any
  nav:any
  show =['login','signup','plan','']
  constructor(private router:Router, private socketIo: SocketIoService, private store: Store<AppState>) {
    this.socketIo.socket.on('socket connection', (connection) => {
      console.log(connection);
      // Add code to show the notification here
    });
    this.socketIo.socket.on('new release movie notification', async (movie) => {
      await this.moviesNotifications.push(movie)
      console.log(`New movie released:`,this.moviesNotifications);
      // Add code to show the notification here
    });
  }

  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'signup'}))
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
