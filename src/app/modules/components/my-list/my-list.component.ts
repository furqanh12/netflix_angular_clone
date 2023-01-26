import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-redux/appState';
import { User } from 'src/app/interface/user.interface';
import { Observable } from 'rxjs';
import { SetUrl } from 'src/app/ngrx-redux/sharedDataReducer';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  
  user$: Observable<User>;
  
  constructor(private http: HttpClient,private entr_s: EntertainmentService, private store: Store<AppState>) {
    this.user$ = store.pipe(select(state => state.user))
    this.user$.subscribe(user => {
      debugger
      console.log('userdata in mylist',user);
    })
  }
  
  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'mylist'}))
  }

}
