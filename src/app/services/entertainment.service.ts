import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  
  constructor(private http:HttpClient) { }

  addMoviesToDB(movies:Array<{}>){
    console.log(movies);
    return this.http.post(environment.host + 'api/movies/insert_to_db',movies)
  }

  loadMovies(pageNo:number):Observable<{status:String,result:Array<{poster_path:string,
    img:string,
    original_title:string}>}>{
    return this.http.get<{status:String,result:Array<{poster_path:string,
      img:string,
      original_title:string}>}>(environment.host + `api/movies/get_movies?page=${pageNo}`,{})
  }
}
