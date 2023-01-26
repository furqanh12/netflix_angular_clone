import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';

import { EntertainmentService } from 'src/app/services/entertainment.service';
import { AppState } from 'src/app/ngrx-redux/appState';
interface moviesObject {
  poster_path:string,
  img:string,
  original_title:string;
}

@Component({
  selector: 'app-series-screen',
  templateUrl: './series-screen.component.html',
  styleUrls: ['./series-screen.component.css']
})
export class SeriesScreenComponent implements OnInit {
  
  constructor(private http:HttpClient, private entr_s:EntertainmentService, private store:Store<AppState>) {}
  
  @ViewChild('scrollMe') private scrollContainer: ElementRef;
  
  private offset = 1200;
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

  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'series'}))
    this.entr_s.loadMovies(this.page).subscribe(data => {
      this.films = data.result;
      this.to_10_movies = this.films
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .filter((item: moviesObject, index: number) => index <= 9 && item);
    });
    this.onscroll();
  }

  onscroll() {
    window.addEventListener('scroll', e => {
      console.log(window.pageYOffset > this.offset);
      if (window.pageYOffset > this.offset) {
        this.offset += this.offset;
        this.page += 1;
        this.entr_s.loadMovies(this.page).subscribe(data => {
          this.films = data.result;
          console.log(this.films);
        });
      }
    });
  }

  selectedFilm(film: moviesObject) {
    this.selected_film = film;
  }



}
