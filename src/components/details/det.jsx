import { useEffect, useState } from "react";
import "./det.css";
import { useParams } from "react-router-dom";

export default function Det() {
  const param = useParams();
  const [movieDet, setmovieDet] = useState(null);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=d3e7038e&i=${param.id}`)
      .then((res) => res.json())
      .then((data) => setmovieDet(data));
  }, [lang]);

  useEffect(() => {
    const fetchArr = [
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Plot}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Type}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Genre}`
      ),
      
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Actors}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Awards}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Country}`
      ),
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=ar&q=${movieDet?.Language}`
      ),
    ];
    if (lang == "ar") {
      Promise.all(fetchArr)
        .then((res) => {
          Promise.all(
            res.map((item) => {
              return item.json();
            })
          ).then((data) => setmovieDet({...movieDet, 
          Plot: data[0][0][0][0],
          Type: data[1][0][0][0],
          Genre: data[2][0][0][0],
          Actors: data[3][0][0][0],
          Awards: data[4][0][0][0],
          Country: data[5][0][0][0],
          Language: data[6][0][0][0],
          }))
        })
    }
  }, [lang]);

  const handleChange = (i) => {
    setLang(i.target.value);
  };

  const movieEl = movieDet ? (
    lang == "en" ? (
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
            <li>
              Type: <span>{movieDet.Type}</span>
            </li>
            <li>
              Genre: <span>{movieDet.Genre}</span>
            </li>
            <li>
              Rating: <span>{movieDet.imdbRating}</span>
            </li>
            <li>
              Awards: <span>{movieDet.Awards}</span>
            </li>
            <li>
              Actors: <span>{movieDet.Actors}</span>
            </li>
            <li>
              Released: <span>{movieDet.Released}</span>
            </li>
            <li>
              Country: <span>{movieDet.Country}</span>
            </li>
            <li>
              Language: <span>{movieDet.Language}</span>
            </li>
            {movieDet.Type.toLowerCase() == "series" ? (
              movieDet.totalSeasons != "N/A" ? (
                <li>
                  Total Seasons: <span>{movieDet.totalSeasons}</span>
                </li>
              ) : null
            ) : null}
          </ul>
        </div>
      </>
    ) : (
      <>
        <div className="movie-de ar">
          <div className="movie--Img">
            <img src={movieDet.Poster} alt="null" />
          </div>
          <div className="movie--title">
            <h1>{movieDet.Title}</h1>
            <p>{movieDet.Year}</p>
          </div>
          <p className="movie--about">{movieDet.Plot}</p>
          <ul className="movie--det">
            <li>
              النوع: <span>{movieDet.Type}</span>
            </li>
            <li>
              التصنيف: <span>{movieDet.Genre}</span>
            </li>
            <li>
              التقييم: <span>{movieDet.imdbRating}</span>
            </li>
            <li>
              الجوائز: <span>{movieDet.Awards}</span>
            </li>
            <li>
              الممثلين: <span>{movieDet.Actors}</span>
            </li>
            <li>
              الاصدار: <span>{movieDet.Released}</span>
            </li>
            <li>
              الدولة: <span>{movieDet.Country}</span>
            </li>
            <li>
              اللغات: <span>{movieDet.Language}</span>
            </li>
            {movieDet.Type.toLowerCase() == "series" ? (
              movieDet.totalSeasons != "N/A" ? (
                <li>
                  عدد المواسم: <span>{movieDet.totalSeasons}</span>
                </li>
              ) : null
            ) : null}
          </ul>
        </div>
      </>
    )
  ) : (
    <>
      <h2>Loading...</h2>
    </>
  );
  return (
    <>
      <div className="lang">
        <label htmlFor="lang">Language</label>
        <select onChange={handleChange} id="lang">
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      {movieEl}
    </>
  );
}
