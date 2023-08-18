import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import { useRef } from "react";

export default function Serach() {
  const [searchMovie, setSearchMovie] = useState(null);
  const [Text, setText] = useState(null);
  const [Type, setType] = useState(null);

  useEffect(() => {
    if (Text != ""  && Text != null && Text != undefined && Text != " " && Text.length > 1 ) {
      fetch(`https://www.omdbapi.com/?apikey=d3e7038e&s=${Text}${Type == ``? null : `&type=${Type}`}`)
        .then((res) => res.json())
        .then((data) => setSearchMovie(data.Search));
    }
  }, [Text, Type]);

  const handleChange = (i) => {
    setInterval(()=>{
        setText(i.target.value);
    },1000)
  };

  const handleChangeSelect = (i)=>{
    i.target.value == "none" ? setType(null): setType(i.target.value)
  }


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
        <div className="serach--type">
        <label htmlFor="type">serach type</label>
        <select onChange={handleChangeSelect} id="type">
        <option value="none">none</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        </div>
        {searchMovie && Text.length > 1? <div className="resalut">
            {movieSe}
            <div className="page">
            <label htmlFor="page">Page </label>
            <select id="page">
              <option value="1" className="value">1</option>
              <option value="2" className="value">2</option>
              <option value="3" className="value">3</option>
              <option value="4" className="value">4</option>
              <option value="5" className="value">5</option>
            </select>
            </div>
        </div>:null}
      </div>
    </>
  );
}
