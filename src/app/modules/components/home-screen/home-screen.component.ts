import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface FeatureState {
  counter: number;
}

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  
  constructor(private router:Router,) {

  }
  
  ngOnInit(): void {

  }
  signUp(){
    this.router.navigateByUrl('signup');
};
}
