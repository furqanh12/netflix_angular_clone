import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrationService } from 'src/app/services/registration.services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router:Router, private reg_s:RegistrationService) {
  }

  ngOnInit(): void {
    localStorage.setItem('Url',this.router.url) 
  }
  
  signUpFormValue(value:any){
    this.reg_s.signUp(value).subscribe((res: any)=>{
      localStorage.setItem('userId',res.user._id)
      localStorage.setItem('token',res.token)
      if(res.status === 'success'){
        this.router.navigateByUrl('plans')
      }
    })
  }

}
