import { Component, OnInit, ViewChild } from '@angular/core';
import { AccoutSettingService } from 'src/app/services/account-setting.service';
import { AppState } from 'src/app/ngrx-redux/appState';
import { select, Store } from '@ngrx/store';
import { SetUrl } from 'src/app/ngrx-redux/sharedDataReducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user.interface';
import * as moment from 'moment';
import { user } from 'src/app/ngrx-redux/userReducer';


@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  count$ = this.store.select(state => state.count);

  @ViewChild('nameChange') nameChange: any;
  url:string
  token:string
  changUsername: FormGroup;
  usernameUpdated:boolean;
  userData:User;
  moment = moment;

  
  constructor(private account_s:AccoutSettingService,private store:Store<AppState>,private fb: FormBuilder) { }
  
  user$:Observable<User>
  
  ngOnInit(): void {
  this.store.dispatch(SetUrl({text:'account_setting'}));
  this.token = localStorage.getItem('token')
  this.account_s.getUserDetails(this.token).subscribe(res=>{
    this.store.dispatch(user(res.user))
  })
  this.user$ = this.store.pipe(select(state => state.user.user))
  this.user$.subscribe(user => {
    this.userData = user
    })
  this.changUsername = this.fb.group({
    newUsername: ['', Validators.required]
  });
  }
  updateUsername() {
    if (this.changUsername.valid) {
        const nameChange = this.changUsername.get('newUsername').value;
        this.account_s.changeName({nameChange},this.token).subscribe(res=>{
          this.userData = res.user
        if(res.message){
          this.usernameUpdated = true
        }
      })
      this.changUsername.reset()
    }
  }

}
