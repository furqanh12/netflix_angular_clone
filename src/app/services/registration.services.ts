import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  signUp(credentials: any){
    return this.http.post(environment.host + 'api/user/signup',credentials)
  }

  signIn(credentials:any){
    return this.http.post(environment.host + 'api/user/login',credentials)
  }

  Plans(plans : any, token: any){
    const body = {plans};
    return this.http.post(environment.host + 'api/user/plans',body,{ headers:{'Authorization':token} })
  }

}
