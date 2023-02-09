import { createAction, props, createReducer, on } from '@ngrx/store';
import { User } from '../interface/user.interface';
import { moviesObject } from '../interface/movie.interface';

export const userData = createAction('[SignIn PAGE] USER DATA',props<User>())
export const upComingMovies = createAction('[Movie Page] UP COMING MOVIES',props<{result:Array<moviesObject>}>())

export const initialState:{fav_movies:Array<moviesObject>,up_coming:Array<moviesObject>}= {
    fav_movies:[],
    up_coming:[]
};

export const userReducer = createReducer(initialState,
    on(userData, (state,action) => {
        return({
            ...state,
            fav_movies: action.fav_movies
        })
    }),

    on(upComingMovies, (state, action) => {
        return({
            ...state,
            up_coming: action.result
        })
    })
)
