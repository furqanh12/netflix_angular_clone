import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { moviesObject } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  
  constructor(private http:HttpClient) { }

  loadMovies(pageNo:number):Observable<{status:String,result:Array<moviesObject>}>{
    return this.http.get<{status:String,result:Array<moviesObject>}>
    (environment.host + `api/movies/get_movies?page=${pageNo}`,{})
  }

  addToFav(movieId:string,token:string){
    return this.http.post(environment.host + 'api/movies/add_fav',{movie_id:movieId},{ headers:{'Authorization':token} })
  }

  getFavMovie(token:string){
    return this.http.get(environment.host + 'api/movies/get_fav',{ headers:{'Authorization':token} })
  }

}
