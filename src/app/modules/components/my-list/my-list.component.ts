import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EntertainmentService } from 'src/app/services/entertainment.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(private http: HttpClient,private entr_s: EntertainmentService,) { }

  ngOnInit(): void {
  }
  getFavMovie(){
    this.entr_s.getFavMovie().subscribe(favMovies => {
      
    })
  }

}
