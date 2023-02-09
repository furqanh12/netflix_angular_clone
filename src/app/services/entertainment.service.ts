import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { moviesObject } from '../interface/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  
  constructor(private http:HttpClient) { }

  loadMovies():Observable<{status:String,result:Array<moviesObject>}>{
    return this.http.get<{status:String,result:Array<moviesObject>}>
    (environment.host + 'api/movies/get_movies',{})
  }

  addToFav(movieId:string,token:string){
    return this.http.post(environment.host + 'api/movies/add_fav',{movie_id:movieId},{ headers:{'Authorization':token} })
  }

  getFavMovie(token:string){
    return this.http.get(environment.host + 'api/movies/get_fav',{ headers:{'Authorization':token} })
  }

  removeFav(token:string, movieId:string){
    return this.http.post(environment.host + 'api/movies/remove_fav',{movieId},{ headers:{'Authorization':token} })
  }

  addToLikeMovies(movieId:string, token:string){
    return this.http.post(environment.host + 'api/movies/add_to_liked_movies',{movieId},{ headers:{'Authorization':token} })
  }

  getLikedMovies(token:string){
    return this.http.get(environment.host + 'api/movies/get_liked_movies',{ headers:{'Authorization':token} })
  }

  removeLikeMovie(movieId:string,token:string){
    return this.http.post(environment.host + 'api/movies/remove_like_movie',{movieId},{ headers:{'Authorization':token} })
  }

  upComingmovies(token:string):Observable<{status:string,result:Array<moviesObject>}>{
    return this.http.get<{status:string,result:Array<moviesObject>}>(environment.host + 'api/movies/up_comings',{headers:{'Authorization':token}})
  }

}
