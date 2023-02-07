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

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesScreenComponent implements OnInit, moviesObject {

  @ViewChild('scrollMe') private scrollContainer: ElementRef;
  
  private offset = 800;
  private page = 1;
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
  to_10_movies: Array<moviesObject> = [];
  selected_film: moviesObject = null;
  movieTitle:string
  movieOverview:string
  _id:string;
  liked: boolean = false;
  alreadyInList:any;
  filterMovie:any=[]
  alreadyLikemovies:any = [];
  token:string;

  constructor(private http: HttpClient, private entr_s: EntertainmentService, private store:Store<AppState>) {}
  user$: Observable<User>;
  
  ngOnInit(): void {
    // get movies for page 1
    // this.user$ = this.store.pipe(select(state => state.user))
    // this.user$.subscribe(user => {
    //   console.log('mov in mylist',this.alreadyInList = user.fav_movies);
    // })
    this.token = localStorage.getItem('token')
    this.getFav()
    this.getLikedMovies()
    this.store.dispatch(SetUrl({text:'movie'}))
    this.entr_s.loadMovies(this.page).subscribe(data => {
      this.films = data.result;
      this.to_10_movies = this.films
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .filter((item: moviesObject, index: number) => index <= 9 && item);
        this.movieTitle = this.to_10_movies[4].title, this.movieOverview = this.to_10_movies[4].overview;
    });
    this.onscroll();
  }
  // get movies by scroll event and page number
  onscroll() {
    window.addEventListener('scroll', e => {
      if (window.pageYOffset > this.offset) {
        this.offset += this.offset;
        this.page += 1;
        this.entr_s.loadMovies(this.page).subscribe(data => {
          this.films = data.result;
        });
      }
    });
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

  onSlideChange() {
    console.log('slide change');
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
    this.getLikedMovies()
    })
  }
}
