import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails, type MovieDetails } from "../api/omdbApi";
import InfoItem from "../components/InfoItem";
import "./MoviePage.module.css";

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<MovieDetails>({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetails(id!),
    });
    if (isLoading) return <p className="loading-message">loading...</p>;
    if (error) return <p className="error-message">something broke: {error.message}</p>;
    return (
        <div className="movie-page">
            <div className="hero-section">
                <img src={data!.Poster} alt={`${data!.Title} poster`} className="hero-poster" />
                <div className="hero-info">
                    <h1 className="movie-title">{data!.Title}</h1>
                    <p className="movie-tagline">
                        {data!.Type} • {data!.Year} • {data!.Rated} • {data!.Runtime}
                    </p>
                    <p className="movie-genre">{data!.Genre}</p>
                </div>
            </div>
            <div className="details-section">
                <h2 className="section-title">overview</h2>
                <p className="movie-plot">{data!.Plot}</p>
                <div className="info-grid">
                    <InfoItem label="director" value={data!.Director} />
                    <InfoItem label="writer" value={data!.Writer} />
                    <InfoItem label="actors" value={data!.Actors} />
                    <InfoItem label="released" value={data!.Released} />
                    <InfoItem label="language" value={data!.Language} />
                    <InfoItem label="country" value={data!.Country} />
                    <InfoItem label="awards" value={data!.Awards} />
                    <InfoItem label="box office" value={data!.BoxOffice} />
                    <InfoItem label="production" value={data!.Production} />
                    <InfoItem label="dvd" value={data!.DVD} />
                    <InfoItem label="website" value={data!.Website} />
                </div>
            </div>
            <div className="ratings-section">
                <h2 className="section-title">ratings</h2>
                <div className="ratings-grid">
                    <div className="rating-item">
                        <strong className="rating-label">imdb</strong>
                        <span className="rating-value">
                            {data!.imdbRating}/10 ({data!.imdbVotes} votes)
                        </span>
                    </div>
                    <div className="rating-item">
                        <strong className="rating-label">metascore</strong>
                        <span className="rating-value">{data!.Metascore}/100</span>
                    </div>
                    {data!.Ratings.map((rating, index) => (
                        <div key={index} className="rating-item">
                            <strong className="rating-label">{rating.Source.toLowerCase()}</strong>
                            <span className="rating-value">{rating.Value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
