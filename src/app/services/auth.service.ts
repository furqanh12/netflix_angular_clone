import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('token')
    return user !== null ? true : false 
  }
}
