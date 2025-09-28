import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails, type MovieDetails } from "../api/omdbApi";

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<MovieDetails>({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetails(id!),
    });
    if (isLoading) return <p>loading...</p>;
    if (error) return <p>something broke: {error.message}</p>;
    return (
        <div className="movie-page">
            <h1>{data!.Title}</h1>
            <img src={data!.Poster} alt={`${data!.Title} poster`} />
            <p>
                <strong>year:</strong> {data!.Year}
            </p>
            <p>
                <strong>genre:</strong> {data!.Genre}
            </p>
            <p>
                <strong>plot:</strong> {data!.Plot}
            </p>
            <p>
                <strong>director:</strong> {data!.Director}
            </p>
            <p>
                <strong>actors:</strong> {data!.Actors}
            </p>
        </div>
    );
}
