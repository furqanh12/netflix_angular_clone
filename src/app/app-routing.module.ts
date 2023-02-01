import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { SignUpComponent } from './modules/components/sign-up/sign-up.component';
import { SignInComponent } from './modules/components/sign-in/sign-in.component';
import { HomeScreenComponent } from './modules/components/home-screen/home-screen.component';
import { PlanScreenComponent } from './modules/components/plan-screen/plan-screen.component';
import { MoviesScreenComponent } from './modules/components/movies-screen/movies-screen.component';
import { SeriesScreenComponent } from './modules/components/series-screen/series-screen.component';
import { MyListComponent } from './modules/components/my-list/my-list.component';


const routes: Routes = [
  {path : '', redirectTo:'' , pathMatch: 'full', component : HomeScreenComponent},
  {path : 'login', component : SignInComponent },
  {path : 'signup', component : SignUpComponent},
  {path : 'plans', component : PlanScreenComponent, canActivate: [AuthGuard]},
  {path : 'home', component : MoviesScreenComponent, canActivate: [AuthGuard]},
  {path : 'tvshow', component : SeriesScreenComponent, canActivate: [AuthGuard]},
  {path : 'movies', component : MoviesScreenComponent, canActivate: [AuthGuard]},
  {path : 'new&popular', component : SeriesScreenComponent, canActivate: [AuthGuard]},
  {path : 'mylist', component : MyListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
