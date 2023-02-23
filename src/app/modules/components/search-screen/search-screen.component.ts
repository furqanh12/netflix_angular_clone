import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { moviesObject } from 'src/app/interface/movie.interface';
import { AppState } from 'src/app/ngrx-redux/appState';
import { EntertainmentService } from 'src/app/services/entertainment.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {
  searchData$:Observable<Array<moviesObject>>

  token:string
  searchMedia:Array<moviesObject>
  selected_film: moviesObject = null;
  alreadyInList:any;
  alreadyLikemovies:any = [];


  constructor(private entr_s:EntertainmentService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getFav()
    this.getLikedMovies()
    this.searchData$ = this.store.select(state => state.searchMedia);
    this.searchData$.subscribe((searchData) => {
      this.searchMedia = searchData
      console.log('Latest search data:', this.searchMedia);
    })
  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
    console.log(this.selected_film)
  }

  addMovieToFav(movieId:string){
    this.entr_s.addToFav(movieId, this.token).subscribe(res=>{
      this.getFav()
    })
  }

  getFav(){
    this.entr_s.getFavMovie(this.token).subscribe(fav =>{
      this.alreadyInList = fav
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

  removeFavMovie(movieId:string){
    this.entr_s.removeFav(this.token,movieId).subscribe(result =>{
      this.getFav()
    })
  }

  removeLikeMovie(movieId:string){
    this.entr_s.removeLikeMovie(movieId,this.token).subscribe(res => {
    this.getLikedMovies()
    })
  }

  filterFav(movieId:string, exist = false){
    for (let i = 0; i < this.alreadyInList?.length; i++) {
      if(this.alreadyInList[i]?._id === movieId){
        return exist = true
      }
    }
    return exist; 
  }

  filterLiked(movieId:string, exist = false){
    for (let i = 0; i < this.alreadyLikemovies?.length; i++) {
      if(this.alreadyLikemovies[i]?._id === movieId){
        return exist = true
      }
    }
    return exist;
  }

}
