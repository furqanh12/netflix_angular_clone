import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';

// import { sharedDataReducer } from './ngrx-redux/sharedDataReducer';
import { AppRoutingModule } from './app-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SwiperModule } from 'swiper/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './modules/components/home-screen/home-screen.component';
import { HeaderComponent } from './modules/menu/header/header.component';
import { FooterComponent } from './modules/menu/footer/footer.component';
import { SignUpComponent } from './modules/components/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanScreenComponent } from './modules/components/plan-screen/plan-screen.component'
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { SignInComponent } from './modules/components/sign-in/sign-in.component';
import { MoviesScreenComponent } from './modules/components/movies-screen/movies-screen.component';
import { SeriesScreenComponent } from './modules/components/series-screen/series-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    PlanScreenComponent,
    SignInComponent,
    MoviesScreenComponent,
    SeriesScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    SwiperModule,
    CarouselModule
    // StoreModule.forRoot({
    // })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
