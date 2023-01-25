import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  
  constructor(private http:HttpClient) { }

  loadMovies(pageNo:number):Observable<{status:String,result:Array<{poster_path:string,
    img:string,
    _id:string,
    original_title:string}>}>{
    return this.http.get<{status:String,result:Array<{poster_path:string, img:string, _id:string, original_title:string}>}>
    (environment.host + `api/movies/get_movies?page=${pageNo}`,{})
  }

  addToFav(movieId:string,token:string){
    console.log(movieId);
    return this.http.post(environment.host + 'api/movies/add_fav',{movie_id:movieId},{ headers:{'Authorization':token} })
  }

  getFavMovie(){
    return this.http.get(environment.host + 'api/movies/get_fav',{})
  }

}
