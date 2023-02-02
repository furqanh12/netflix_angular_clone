import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-redux/appState';
import { User } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { SetUrl } from 'src/app/ngrx-redux/sharedDataReducer';
import { moviesObject } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  
  user$: Observable<User>;
  favMovie:any
  selected_film: moviesObject = null;

  
  constructor(private http: HttpClient,private entr_s: EntertainmentService, private store: Store<AppState>) {
    this.user$ = store.pipe(select(state => state.user))
    this.user$.subscribe(user => {
      console.log('userdata in mylist',user.fav_movies);
    })
    this.getFavMovies()
  }
  
  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'mylist'}))
  }

  getFavMovies(){
    const token = localStorage.getItem('token')
    this.entr_s.getFavMovie(token).subscribe(res =>{
      this.favMovie = res
    })
  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
    console.log(this.selected_film)
  }

}
