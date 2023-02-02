import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.services';
import { userData } from 'src/app/ngrx-redux/userReducer';
import { AppState } from 'src/app/ngrx-redux/appState';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  count$ = this.store.select(state => state.count);
  error:string

  constructor( private router: Router, private reg_s:RegistrationService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'login'})) 
  }

  signInFormValue(value:any){
    console.log(value);
    this.reg_s.signIn(value).subscribe((res: any)=>{
      console.log('login page',res);
      this.store.dispatch(userData(res.user))
      localStorage.setItem('token',res.token)
      if(res.status === 'success' && res.token){
        this.router.navigateByUrl('movies')
      }
    },err =>{
      this.error = err.error
    });
  }

  

}
