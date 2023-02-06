import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from 'src/app/services/entertainment.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx-redux/appState';
import { User } from 'src/app/interface/user.interface';
import { Observable } from 'rxjs';
import { SetUrl } from 'src/app/ngrx-redux/sharedDataReducer';
import { moviesObject } from 'src/app/interface/movie.interface';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  
  user$: Observable<User>;
  favMovie:any=[]
  selected_film: moviesObject = null;
  alreadyInList:any;
  token:string;

  
  constructor(private http: HttpClient,private entr_s: EntertainmentService, private store: Store<AppState>) {
    this.user$ = store.pipe(select(state => state.user))
    this.user$.subscribe(user => {
      console.log('userdata in mylist',user.fav_movies);
    })
  }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    console.log('token',this.token);
    this.store.dispatch(SetUrl({text:'mylist'}))
    this.getFavMovies()
  }

  getFavMovies(){
    console.log("object");
    this.entr_s.getFavMovie(this.token).subscribe(res =>{
      this.favMovie = res
    })
  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
  }

  removeFavMovie(movieId:string){
    this.entr_s.removeFav(this.token,movieId).subscribe(result =>{
      this.getFavMovies()
    })
  }

}
