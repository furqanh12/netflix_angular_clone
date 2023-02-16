import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { notifications } from 'src/app/interface/notification.interface';
import { AppState } from 'src/app/ngrx-redux/appState';
import { NotificationService } from 'src/app/services/notification.service';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import { SocketIoService } from '../../../services/socket-io.service';
import * as moment from 'moment';

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

  moviesNotifications: Array<notifications> = []
  notificationBanners:number = 0;
  userId: string
  url: any
  token: string
  nav:any
  show =['login','signup','plan','']
moment = moment;
  constructor(private router:Router, private noti_s:NotificationService, private socketIo: SocketIoService, private store: Store<AppState>) {
    this.socketIo.socket.on('socket connection', (connection) => {
      console.log(connection);
    });
    this.userId = localStorage.getItem('userId')
    this.socketIo.socket.on(`new_release_movie_notification${this.userId}`, (movie) => {
      this.moviesNotifications.push(movie)
      this.notificationBanners++
      console.log(`New movie released:`,movie);
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    console.log(this.token);
    this.noti_s.allNotifications(this.token).subscribe(res => {
      this.moviesNotifications = res
      this.notificationBanner(this.moviesNotifications)
    })
    this.store.dispatch(SetUrl({text:'signup'}))
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
  notificationBanner(notifications:Array<notifications>){
    notifications.forEach((noti)=>{
      if(!noti.mark_as_read){
        this.notificationBanners++
      }
    })
  }
  
  signIn(){
    console.log(this.url = localStorage.getItem('Url'))
    this.router.navigateByUrl('login')
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigateByUrl('login')
  }
  

}
