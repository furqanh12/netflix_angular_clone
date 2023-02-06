export interface User {

        createdAt: string;
        email: string;
        fav_movies: Array<{
            adult: boolean;
            backdrop_path: string;
            createdAt: string;
            genre_ids: number[];
            id: number;
            img: string;
            original_language: string;
            original_title: string;
            overview: string;
            popularity: number;
            poster_path: string;
            release_date: string;
            title: string;
            updatedAt: string;
            video: boolean;
            vote_average: number;
            vote_count: number;
            __v: number;
            _id: string;
        }>;
        password: string;
        plan: string;
        plan_expire: string;
        updatedAt: string;
        __v: number;
        _id: string;
}



