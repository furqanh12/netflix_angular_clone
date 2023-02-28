import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AccoutSettingService {

  constructor(private http: HttpClient) { }

  changeName(newUsername:{},token:string):Observable<{message:string,user:User}>{
    return this.http.post<{message:string,user:User}>(environment.host + 'api/account_setting/change_username',newUsername,{ headers:{'Authorization':token} })
  }

  getUserDetails(token:string):Observable<{message:string,user:User}>{
    return this.http.get<{message:string,user:User}>(environment.host + 'api/account_setting/user_details',{ headers:{'Authorization':token} })
  }

}
