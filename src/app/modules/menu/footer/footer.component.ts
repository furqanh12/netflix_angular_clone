import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
url: string | null | undefined;
  constructor() { }

  ngOnInit(): void {
    this.url = localStorage.getItem('Url')
    console.log(this.url)
  }

}
