import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/omdbApi";
import type { SearchResponse } from "../api/omdbApi";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data, isLoading, error } = useQuery<SearchResponse>({
        queryKey: ["movies", searchQuery],
        queryFn: () => searchMovies(searchQuery),
        enabled: !!searchQuery,
    });

    return (
        <div className="search-page">
            <h1>Search Movies</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter movie title..."
                className="search-input"
            />
            {isLoading && <p>loading...</p>}
            {error && <p>something broke: {error.message}</p>}
            {data?.Search && (
                <ul className="movie-list">
                    {data.Search.map((movie) => (
                        <li key={movie.imdbID}>
                            <Link to={`/movie/${movie.imdbID}`}>
                                {movie.Title} ({movie.Year})
                            </Link>
                            {/* <img src={movie.Poster} /> */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
