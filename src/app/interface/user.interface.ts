import { moviesObject } from "./movie.interface";

export interface User {

        createdAt: string;
        email: string;
        fav_movies: Array<moviesObject>;
        password: string;
        plan: string;
        plan_expire: string;
        updatedAt: string;
        __v: number;
        _id: string;
}



