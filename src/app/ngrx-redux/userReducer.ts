import { createAction, props, createReducer, on} from '@ngrx/store';
import { User } from '../interface/user.interface';

export const userData = createAction('[SignIn PAGE] USER DATA',props<User>())

export const initialState: User = {
    data:{
        createdAt: '',
        email: '',
        fav_movies: [],
        password: '',
        plan: '',
        plan_expire: '',
        updatedAt: '',
        __v: 0,
        _id: '',
    }
};

export const userReducer = createReducer(initialState,
    on(userData, (state,action)=> {
        console.log('action data', action);
        return({
        ...state,
        data: action.data
    })})
    )
