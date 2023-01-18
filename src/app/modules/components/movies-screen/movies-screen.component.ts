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

  constructor(private http:HttpClient, private entr_s:EntertainmentService) {}
  films: Array<moviesObject>;
  poster_path: string;
  img: string;
  original_title: string;
  top_movies:Array<{url:string}>= [
    {url:"../../../../assets/1.png"},
    {url:"../../../../assets/2.png"},
    {url:"../../../../assets/3.png"},
    {url:"../../../../assets/4.png"},
    {url:"../../../../assets/5.png"},
    {url:"../../../../assets/6.png"},
    {url:"../../../../assets/7.png"},
    {url:"../../../../assets/8.png"},
    {url:"../../../../assets/9.png"},
    {url:"../../../../assets/10.png"},
];
to_10_movies:Array<moviesObject>=[]
  


  ngOnInit(): void {
     this.entr_s.loadMovies().subscribe((movies:any)=>{
      this.films = (movies?.results ?? []).map((item:moviesObject)=>{ return {...item,img:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}})
      this.to_10_movies=(this.films.sort((a:any,b:any)=>b.popularity-a.popularity)).filter((item:moviesObject,index:number)=>index <= 9 && item)
    })
  }

  onSlideChange() {
    console.log('slide change');
  }
  onSwiper(swiper:any) {
    console.log(swiper);
  }
}
