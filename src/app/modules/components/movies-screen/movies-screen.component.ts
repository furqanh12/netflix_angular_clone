import {HttpClient} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { moviesObject } from 'src/app/interface/movie.interface';


import {EntertainmentService} from 'src/app/services/entertainment.service';
import { AppState } from 'src/app/ngrx-redux/appState';

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesScreenComponent implements OnInit, moviesObject {

  @ViewChild('scrollMe') private scrollContainer: ElementRef;
  
  private offset = 1000;
  private page = 1;
  films: Array<moviesObject>;
  poster_path: string;
  img: string;
  original_title: string;
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
  _id:string;
  liked: boolean = false;

  constructor(private http: HttpClient, private entr_s: EntertainmentService, private store:Store<AppState>) {}
  
  
  ngOnInit(): void {
    // get movies for page 1
    this.store.dispatch(SetUrl({text:'movie'}))
    this.entr_s.loadMovies(this.page).subscribe(data => {
      this.films = data.result;
      this.to_10_movies = this.films
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .filter((item: moviesObject, index: number) => index <= 9 && item);
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
  }

  addMovieToFav(movieId:string){
    console.log(movieId);
    const token = localStorage.getItem('token')
    this.entr_s.addToFav(movieId, token).subscribe(res=>{
    })
  }
  

}
