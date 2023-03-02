import { createAction, props, createReducer, on} from '@ngrx/store';
import { moviesObject } from '../interface/movie.interface';

export const searchData = createAction('[ SEARCH DATA] SEARCH DATA', props<{result:Array<moviesObject>}>())

export const initialState: Array<moviesObject>=[]

export const searchMedia = createReducer(initialState,
    on(searchData, (state, action) =>{
        return state = action.result
    })
)