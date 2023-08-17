import { useEffect, useState } from "react";
import "./det.css";
import { useParams } from "react-router-dom";

export default function Det() {
  const param = useParams();

  const [movieDet, setmovieDet] = useState(null);
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=d3e7038e&i=${param.id}`)
      .then((res) => res.json())
      .then((data) => setmovieDet(data));
  }, []);

  console.log(movieDet);

  const movieEl = movieDet ? (
    <>
      <div className="movie-de">
        <div className="movie--Img">
          <img src={movieDet.Poster} alt="null" />
        </div>
        <div className="movie--title">
          <h1>{movieDet.Title}</h1>
          <p>{movieDet.Year}</p>
        </div>
        <p className="movie--about">{movieDet.Plot}</p>
        <ul className="movie--det">
          <li>Type: <span>{movieDet.Type}</span></li>
          <li>Genre: <span>{movieDet.Genre}</span></li>
          <li>Rating: <span>{movieDet.imdbRating}</span></li>
          <li>Awards: <span>{movieDet.Awards}</span></li>
          <li>Actors: <span>{movieDet.Actors}</span></li>
          <li>Released: <span>{movieDet.Released}</span></li>
          <li>Country: <span>{movieDet.Country}</span></li>
          <li>Language: <span>{movieDet.Language}</span></li>
          {movieDet.Type.toLowerCase() == "series" ? (
            movieDet.totalSeasons != "N/A" ? (
              <li>Total Seasons: <span>{movieDet.totalSeasons}</span></li>
            ) : null
          ) : null}
        </ul>
      </div>
    </>
  ) : (
    <>
      <h2>Loading...</h2>
    </>
  );
  return <>{movieEl}</>;
}
