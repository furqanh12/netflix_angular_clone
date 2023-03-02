import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.services';
import { userData, user } from 'src/app/ngrx-redux/userReducer';
import { AppState } from 'src/app/ngrx-redux/appState';
import { User } from 'src/app/interface/user.interface';

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
    this.reg_s.signIn(value).subscribe((res)=>{
      this.store.dispatch(user(res.user))
      
      this.store.dispatch(userData(res.user))
      localStorage.setItem('userId',res.user._id)
      localStorage.setItem('token',res.token)
      if(res.status === 'success' && res.token){
        this.router.navigateByUrl('movies')
      }
    },err =>{
      this.error = err.error
    });
  }

  

}
