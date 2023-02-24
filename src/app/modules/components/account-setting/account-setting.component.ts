import { Component, OnInit } from '@angular/core';
import { AccoutSettingService } from 'src/app/services/account-setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  url:string

  constructor(private account_s:AccoutSettingService) { }

  ngOnInit(): void {
  }
  updateUsername(newUsername) {
    this.url = localStorage.getItem('token')
    this.account_s.changeName(newUsername,this.url).subscribe(res=>{
      console.log(res);
    })
  }

    
}
