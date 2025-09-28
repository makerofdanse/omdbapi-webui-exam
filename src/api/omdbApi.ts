const API_KEY = "a2b07930";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query: string): Promise<any> {
    if (!query) return [];
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error("failed to fetch movies");
    return response.json();
}

export async function getMovieDetails(id: string) {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error("failed to fetch movie details");
    return response.json();
}

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface SearchResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}
