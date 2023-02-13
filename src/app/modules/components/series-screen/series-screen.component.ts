import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';
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
import { upComingMovies } from 'src/app/ngrx-redux/userReducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-series-screen',
  templateUrl: './series-screen.component.html',
  styleUrls: ['./series-screen.component.css']
})
export class SeriesScreenComponent implements OnInit, moviesObject {

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
  to_10_movies: Array<moviesObject> = [];
  selected_film: moviesObject = null;
  movieTitle:string
  movieOverview:string
  _id:string;
  liked: boolean = false;
   alreadyInList:any;
  filterMovie:any=[]
  token:string;
  alreadyLikemovies:any = [];
  upComingMovies:Array<moviesObject>
  url:string;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private entr_s: EntertainmentService, private store:Store<AppState>) {}
  user$: Observable<Array<moviesObject>>;
  
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.url = segments.join('/');
    });
    this.user$ = this.store.pipe(select(state => state.user.up_coming))
    this.user$.subscribe(user => {
      console.log('mov in mylist',this.upComingMovies = user);
    })
    this.token = localStorage.getItem('token')
    this.store.select(state => state)
    this.getFav()
    this.getLikedMovies()
    // get movies for page 1
    this.store.dispatch(SetUrl({text:'movie'}))
    this.entr_s.loadMovies().subscribe(data => {
      this.films = data.result;
      this.to_10_movies = this.films
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .filter((item: moviesObject, index: number) => index <= 9 && item);
        this.movieTitle = this.to_10_movies[6].title, this.movieOverview = this.to_10_movies[6].overview;
    });
    this.entr_s.upComingmovies(this.token).subscribe((res) =>{
      console.log(res.result);
      return this.store.dispatch(upComingMovies({result: res.result}));
    })
  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
  }

  addMovieToFav(movieId:string){
    console.log(movieId);
    const token = localStorage.getItem('token')
    this.entr_s.addToFav(movieId, token).subscribe(res=>{
      this.getFav()
    })
  }

  onSlideChange() {
    console.log('slide change');
  }

  getFav(){
    this.entr_s.getFavMovie(this.token).subscribe(fav =>{
      this.alreadyInList = fav
      console.log(this.alreadyInList);
    })
  }

  filterFav(movieId:string, exist=false){
    for (let i = 0; i < this.alreadyInList?.length; i++) {
      if(this.alreadyInList[i]._id === movieId){
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

  getMovieIdForReminder(movieId:string){
    console.log(movieId);
    this.entr_s.setReminder(movieId,this.token).subscribe(res =>{
      console.log("rem",res);
    })
  }

}
