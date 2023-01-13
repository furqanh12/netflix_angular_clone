import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';

// import { sharedDataReducer } from './ngrx-redux/sharedDataReducer';
import { AppRoutingModule } from './app-routing.module';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // StoreModule.forRoot({
    //   token:sharedDataReducer
    // })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
