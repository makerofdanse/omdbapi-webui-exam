import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails, type MovieDetails } from "../api/omdbApi";
import InfoItem from "../components/InfoItem";
import styles from "./MoviePage.module.css";

export default function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<MovieDetails>({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetails(id!),
    });
    if (isLoading) return <p className={styles.loadingMessage}>loading...</p>;
    if (error) return <p className={styles.errorMessage}>something broke: {error.message}</p>;
    return (
        <div className={styles.moviePage}>
            <div className={styles.heroSection}>
                <img src={data!.Poster} alt={`${data!.Title} poster`} className={styles.heroPoster} />
                <div className={styles.heroInfo}>
                    <h1 className={styles.movieTitle}>{data!.Title}</h1>
                    <p className={styles.movieTagline}>
                        {data!.Type} • {data!.Year} • {data!.Rated} • {data!.Runtime}
                    </p>
                    <p className={styles.movieGenre}>{data!.Genre}</p>
                </div>
            </div>
            <div className={styles.detailsSection}>
                <h2 className={styles.sectionTitle}>overview</h2>
                <p className={styles.moviePlot}>{data!.Plot}</p>
                <div className={styles.infoGrid}>
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
            <div className={styles.ratingsSection}>
                <h2 className={styles.sectionTitle}>ratings</h2>
                <div className={styles.ratingsGrid}>
                    <div className={styles.ratingItem}>
                        <strong className={styles.ratingLabel}>imdb</strong>
                        <span className={styles.ratingValue}>
                            {data!.imdbRating}/10 ({data!.imdbVotes} votes)
                        </span>
                    </div>
                    <div className={styles.ratingItem}>
                        <strong className={styles.ratingLabel}>Metascore</strong>
                        <span className={styles.ratingValue}>{data!.Metascore}/100</span>
                    </div>
                    {data!.Ratings.map((rating, index) => (
                        <div key={index} className={styles.ratingItem}>
                            <strong className={styles.ratingLabel}>{rating.Source.toLowerCase()}</strong>
                            <span className={styles.ratingValue}>{rating.Value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
