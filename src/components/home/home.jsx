import Movie from "../movieCard/card";
import { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import { Link } from "react-router-dom";
import Serach from "../search/search";

export default function Home() {
  const [movie, setmovie] = useState({});
  const url =
    "https://moviesdatabase.p.rapidapi.com/titles/random?limit=50&list=most_pop_series";
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
  }, []);

  const movieRes = movie.results;

  return (
    <>
         <Serach/>
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
