import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/omdbApi";
import { useSearch } from "../SearchContext";
import type { SearchResponse } from "../api/omdbApi";
import styles from "./SearchPage.module.css";

const DEBOUNCE_DELAY_MS = 800;

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

export default function SearchPage() {
    const { searchQuery, setSearchQuery } = useSearch();
    const [localQuery, setLocalQuery] = useState<string>(searchQuery);
    const debouncedQuery = useDebounce(localQuery, DEBOUNCE_DELAY_MS);

    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    const { data, isLoading, error } = useQuery<SearchResponse>({
        queryKey: ["movies", debouncedQuery],
        queryFn: () => searchMovies(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setLocalQuery(e.target.value);
        setSearchQuery(e.target.value);
    };

    return (
        <div className={styles.searchPage}>
            <h1 className={styles.searchTitle}>search movies</h1>
            <input
                type="text"
                value={localQuery}
                onChange={handleInputChange}
                placeholder="enter movie title..."
                className={styles.searchInput}
            />
            {isLoading && <p className={styles.loadingMessage}>loading...</p>}
            {error && <p className={styles.errorMessage}>something broke: {error.message}</p>}
            {data?.Search && (
                <div className={styles.movieGrid}>
                    {data.Search.map((movie) => (
                        <div key={movie.imdbID} className={styles.movieCard}>
                            <Link to={`/movie/${movie.imdbID}`} className={styles.movieLink}>
                                <img
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : `${import.meta.env.BASE_URL}fallback.svg`
                                    }
                                    alt={`${movie.Title} poster`}
                                    className={styles.moviePoster}
                                />
                                <h2 className={styles.movieTitle}>{movie.Title}</h2>
                                <p className={styles.movieYear}>({movie.Year})</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
