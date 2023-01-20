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
    return this.http.post(environment.host + 'api/movies',movies)
  }

  loadMovies():Observable<any[]>{
    return this.http.get<any[]>('https://api.themoviedb.org/3/discover/movie?api_key=87dfa1c669eea853da609d4968d294be&language=fr-FR&sort_by=popularity.desc')
  }
}
