import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/omdbApi";
import type { SearchResponse } from "../api/omdbApi";
import "./SearchPage.module.css";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data, isLoading, error } = useQuery<SearchResponse>({
        queryKey: ["movies", searchQuery],
        queryFn: () => searchMovies(searchQuery),
        enabled: !!searchQuery,
    });

    return (
        <div className="search-page">
            <h1 className="search-title">search movies</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="enter movie title..."
                className="search-input"
            />
            {isLoading && <p className="loading-message">loading...</p>}
            {error && <p className="error-message">something broke: {error.message}</p>}
            {data?.Search && (
                <div className="movie-grid">
                    {data.Search.map((movie) => (
                        <div key={movie.imdbID} className="movie-card">
                            <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                                <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
                                <h2 className="movie-title">{movie.Title}</h2>
                                <p className="movie-year">({movie.Year})</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
