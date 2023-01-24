import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import { RegistrationService } from 'src/app/services/registration.services';
declare var $: any

@Component({
  selector: 'app-plan-screen',
  templateUrl: './plan-screen.component.html',
  styleUrls: ['./plan-screen.component.css']
})
export class PlanScreenComponent implements OnInit {


  constructor(private router:Router, private reg_s:RegistrationService, private store:Store<{count:string}>) {}

  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'plan'}))
  }
  plansValue(value: any){
    let token = localStorage.getItem('token')
    this.reg_s.Plans(value,token).subscribe((res) => {
      if(res !== null){
        this.router.navigateByUrl('movies')
      }
    })
    
  }
  changeColor(color:any){
    $(".button-one").click(function () {
      $(".one").css({ color: "#e50914", fill: "#e50914" });
    });
  }
}
