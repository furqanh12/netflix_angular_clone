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
  
  user$: Observable<Array<moviesObject | []>>
  favMovie:any=[]
  selected_film: moviesObject = null;
  alreadyInList:any;
  token:string;
  alreadyLikemovies:any = [];

  
  constructor(private http: HttpClient,private entr_s: EntertainmentService, private store: Store<AppState>) {
    this.user$ = store.pipe(select(state => state.user.fav_movies))
    this.user$.subscribe((fav_movies:Array<moviesObject | []>) => {
      this.favMovie=fav_movies
      // console.log('userdata in mylist',user.fav_movies);
    })
  }
  
  ngOnInit(): void {
    this.getLikedMovies()
    this.token = localStorage.getItem('token')
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

  addToLikedMovie(movieId:string){
    this.entr_s.addToLikeMovies(movieId,this.token).subscribe(res =>{
      console.log(res);
      this.getLikedMovies()
    })
  }

  getLikedMovies(){
    this.entr_s.getLikedMovies(this.token).subscribe(res => {
      this.alreadyLikemovies = res
    })
  }

  filterLiked(movieId:string, exist = false){

    for (let i = 0; i < this.alreadyLikemovies?.length; i++) {

      if(this.alreadyLikemovies[i]?._id === movieId){
        return exist = true
      }
    }
    return exist;
  }

  removeLikeMovie(movieId:string){
    this.entr_s.removeLikeMovie(movieId,this.token).subscribe(res => {
        console.log(res);
    this.getLikedMovies()
    })
  }

}
