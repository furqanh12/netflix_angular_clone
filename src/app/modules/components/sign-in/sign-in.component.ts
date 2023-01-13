import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error:any
  constructor( private router: Router, private reg_s:RegistrationService) { }

  ngOnInit(): void {
    localStorage.setItem('Url',this.router.url) 
  }

  signInFormValue(value:any){
    this.reg_s.signIn(value).subscribe((res: any)=>{
      localStorage.setItem('token',res.token)
      if(res.status === 'success' && res.token){
        localStorage.setItem('Url','movies')
        this.router.navigateByUrl('movies')
      }
    },err =>{
      this.error = err.error
    });
  }

  

}
