import { moviesObject } from "./movie.interface";

export interface notifications {
    message: string;
    movie: moviesObject
    date: Date;
    mark_as_read: boolean;

}