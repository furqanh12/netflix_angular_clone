import {HttpClient} from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { moviesObject } from 'src/app/interface/movie.interface';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import {EntertainmentService} from 'src/app/services/entertainment.service';
import { AppState } from 'src/app/ngrx-redux/appState';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user.interface';
import { stringify } from 'querystring';
import { upComingMovies } from 'src/app/ngrx-redux/userReducer';

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class MoviesScreenComponent implements OnInit, moviesObject {

  @ViewChild('scrollMe') private scrollContainer: ElementRef;
  
  films: Array<moviesObject>;
  poster_path: string;
  img: string;
  original_title: string;
  overview:string;
  title:string;
  vote_average:string;
  release_date:string;
  vote_count:string;
  top_movies: Array<{url: string}> = [
    {url: '../../../../assets/1.png'},
    {url: '../../../../assets/2.png'},
    {url: '../../../../assets/3.png'},
    {url: '../../../../assets/4.png'},
    {url: '../../../../assets/5.png'},
    {url: '../../../../assets/6.png'},
    {url: '../../../../assets/7.png'},
    {url: '../../../../assets/8.png'},
    {url: '../../../../assets/9.png'},
    {url: '../../../../assets/10.png'},
  ];
  top_10_movies: Array<moviesObject> = [];
  selected_film: moviesObject = null;
  movieTitle:string
  movieOverview:string
  _id:string;
  liked: boolean = false;
  alreadyInList:any;
  filterMovie:any=[]
  alreadyLikemovies:any = [];
  token:string;
  upComingMovies:Array<moviesObject | []>

  constructor(private http: HttpClient, private entr_s: EntertainmentService, private store:Store<AppState>) {}
  user$: Observable<Array<moviesObject | []>>;
  
  
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getFav()
    this.getLikedMovies()
    this.store.dispatch(SetUrl({text:'movie'}))
    this.entr_s.loadMovies().subscribe(data => {
      this.films = data.result.sort((a:any, b:any)=> b.vote_count - a.vote_count)
      this.top_10_movies = this.films
        .filter((item: moviesObject, index: number) => index <= 9 && item);
        this.top_10_movies.sort(()=> -1)
        this.movieTitle = this.top_10_movies[5].title, this.movieOverview = this.top_10_movies[5].overview;
    });

  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
  }

  addMovieToFav(movieId:string){
    this.entr_s.addToFav(movieId, this.token).subscribe(res=>{
      this.getFav()
    })
  }

  onSlideChange() {
  }
  getFav(){
    this.entr_s.getFavMovie(this.token).subscribe(fav =>{
      this.alreadyInList = fav
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

  removeFavMovie(movieId:string){
    this.entr_s.removeFav(this.token,movieId).subscribe(result =>{
      this.getFav()
    })
  }

  addToLikedMovie(movieId:string){
    this.entr_s.addToLikeMovies(movieId,this.token).subscribe(res =>{
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
    this.getLikedMovies()
    })
  }
}
