import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";

export default function Serach() {
  const [searchMovie, setSearchMovie] = useState(null);
  const [Text, setText] = useState(null);
    
  useEffect(() => {
    if (Text != ""  && Text != null && Text != undefined && Text != " " && Text.length > 1 ) {
      fetch(`https://www.omdbapi.com/?apikey=d3e7038e&s=${Text}`)
        .then((res) => res.json())
        .then((data) => setSearchMovie(data.Search));
    }
  }, [Text]);

  console.log(searchMovie)
  const handleChange = (i) => {
    setInterval(()=>{
        setText(i.target.value);
    },1000)
  };

  const movieSe = searchMovie? searchMovie?.map((item)=>{
    return (
        <Link key={item.imdbID} to={`Movies/${item.imdbID}`}>
        <div className="moive-se-card">
            <div className="moive-se--img">
                <img src={item.Poster} alt="" />
            </div>
            <div className="movie-se--de">
                <h4>{item.Title}</h4>
                <p>{item.Year}</p>
            </div>
        </div>
        </Link>
    )
  }): null;

  return (
    <>
      <div className="serach">
        🔍
        <input onChange={handleChange} type="text" />
        {searchMovie && Text.length > 1? <div className="resalut">
            {movieSe}
        </div>:null}
      </div>
    </>
  );
}
