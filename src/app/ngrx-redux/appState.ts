import { User } from "../interface/user.interface";
import { moviesObject } from "../interface/movie.interface";

export interface AppState {
    count: string,
    user: {
        up_coming:Array<moviesObject>,
        fav_movies:Array<moviesObject>,
        user:User
    },
    searchMedia:Array<moviesObject>
}  