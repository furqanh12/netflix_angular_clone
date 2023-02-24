import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccoutSettingService {

  constructor(private http: HttpClient) { }

  changeName(newUsername:{},token:string){
    return this.http.post(environment.host + 'api/account_setting/change_name',newUsername,{ headers:{'Authorization':token} })
  }

}
