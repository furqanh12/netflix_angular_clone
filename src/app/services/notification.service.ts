import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { notifications } from '../interface/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  allNotifications(token:string):Observable<[notifications]>{
    return this.http.get<[notifications]>(environment.host + 'api/notifications/all_notifications',{headers:{'Authorization':token}})
  }

  setReadNotifications(message:string, token:string){
    return this.http.post(environment.host + 'api/notifications/set_read_notifications',{message},{headers:{'Authorization':token}})
  }

}
