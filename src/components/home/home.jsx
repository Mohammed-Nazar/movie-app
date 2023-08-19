import Movie from "../movieCard/card";
import { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import { Link } from "react-router-dom";
import Serach from "../search/search";
import "./home.css"

export default function Home() {
  const [movie, setmovie] = useState({});
  const [genreSe, setGenre] = useState("none");
  const [typeSe, setType] = useState("none");


  const genreMovie = [
    "none",
    "Action",
"Adventure",
"Animation",
"Biography",
"Comedy",
"Crime",
"Documentary",
"Drama",
"Family",
"Fantasy",
"Film-Noir",
"Game-Show",
"History",
"Horror",
"Mystery",
"News",
"Reality-TV",
"Romance",
"Sci-Fi",
"Short",
"Sport",
"Talk-Show",
"Thriller",
"War",
"Western"
  ]

  const url =
    `https://moviesdatabase.p.rapidapi.com/titles/random?limit=50&list=${typeSe == "movie"?`most_pop_movies`:`most_pop_series`}${genreSe !="none"? `&genre=${genreSe}`:``}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "49c55b43b8msh28b06ea2ac2bd46p1ec444jsn18c36acd1488",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  const fetchMovie = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setmovie(data);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, [genreSe,typeSe]);

  const handleChangeGenre = (i)=>{
    setGenre(i.target.value)
  }
  const handleChangeType = (i)=>{
    setType(i.target.value)
  }


  const movieRes = movie.results;

  return (
    <>
         <Serach/>
         <div className="select-con">
         <div className="select-home">
          <label className="genre-label" htmlFor="genre">Genre</label>
          <select onChange={handleChangeGenre} className="genre-select" name="genre" id="genre">
            {genreMovie.map((i)=>{
             return <option key={i} value={i}>{i}</option>
            })}
          </select>
         </div>
         <div className="select-home">
          <label className="genre-label" htmlFor="genre">Type</label>
          <select onChange={handleChangeType} className="genre-select" name="genre" id="genre">
          <option value="none" className="type--option">none</option>
            <option value="movie" className="type--option">Movie</option>
            <option value="series" className="type--option">Series</option>
          </select>
         </div>

         </div>
      <div className="card-con">
        {movieRes? movieRes?.map((x) => (
          <Link key={x.id} to={`Movies/${x.id}`}>
          <Movie
            key={x.id}
            img={x.primaryImage?.url}
            title={x.titleText?.text}
            year={x.releaseYear?.year}
            type={x.titleType?.text}
          />
          </Link>
        )): <h1>Loading...</h1>}
      </div>
    </>
  );
}
