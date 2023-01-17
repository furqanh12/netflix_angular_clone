import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import { EntertainmentService } from 'src/app/services/entertainment.service';
interface moviesObject {
  poster_path:string,
  img:string,
  original_title:string;
}

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MoviesScreenComponent implements  OnInit ,moviesObject {

  films: Array<moviesObject>;
  constructor(private http:HttpClient, private entr_s:EntertainmentService) {}
  poster_path: string;
  img: string;
  original_title: string;


  ngOnInit(): void {
     this.entr_s.loadMovies().subscribe((movies)=>{
      this.films = (movies['results'] ?? []).map((item:moviesObject)=>{ return {...item,img:`https://image.tmdb.org/t/p/w500${item.poster_path}`}})
      console.log(this.films)
    })
  }

  onSlideChange() {
    console.log('slide change');
  }
  onSwiper(swiper:any) {
    console.log(swiper);
  }
}
