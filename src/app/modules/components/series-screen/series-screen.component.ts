import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Store } from '@ngrx/store';
import { SetUrl } from '../../../ngrx-redux/sharedDataReducer';

import { EntertainmentService } from 'src/app/services/entertainment.service';
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
  to_10_movies: moviesObject[];

  constructor(private http:HttpClient, private entr_s:EntertainmentService, private store:Store<{count:string}>) {}
  films: Array<moviesObject>;
  poster_path: string;
  img: string;
  original_title: string;
  ngOnInit(): void {
    this.store.dispatch(SetUrl({text:'series'}))
    // this.entr_s.loadMovies().subscribe((movies:any)=>{
    //   this.films = (movies?.results ?? []).map((item:moviesObject)=>{ return {...item,img:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}})
    //   this.to_10_movies=(this.films.sort((a:any,b:any)=>b.popularity-a.popularity)).filter((item:moviesObject,index:number)=>index <= 9 && item)
    // })
  }


  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  

}
