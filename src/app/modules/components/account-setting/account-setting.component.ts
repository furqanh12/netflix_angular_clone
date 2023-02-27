import { Component, OnInit, ViewChild } from '@angular/core';
import { AccoutSettingService } from 'src/app/services/account-setting.service';
import { AppState } from 'src/app/ngrx-redux/appState';
import { Store } from '@ngrx/store';
import { SetUrl } from 'src/app/ngrx-redux/sharedDataReducer';

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

  constructor(private account_s:AccoutSettingService,private store:Store<AppState>) { }

  ngOnInit(): void {
  this.store.dispatch(SetUrl({text:'account_setting'})) 

  }
  updateUsername(newUsername:string,event:Event) {
    // console.log(event);
    event.preventDefault();
    this.token = localStorage.getItem('token')
    this.account_s.changeName(newUsername,this.token).subscribe(res=>{
      console.log(res);
    })
    this.nameChange.reset()
  }

}
