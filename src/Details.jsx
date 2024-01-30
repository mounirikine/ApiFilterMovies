import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const handleFilter = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=6e30c4b4&i=${id}`);
        const data = await res.json();
        setFilms(data);
      } catch (err) {
        console.error(err);
      }
    };

    handleFilter();
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-center">
        <img className="rounded-lg" src={films.Poster} alt="" />
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold">{films.Year}</h1>
        <h1 className="text-lg font-semibold">{films.Rated}</h1>
        <h1 className="text-lg font-semibold">{films.Released}</h1>
        <h1 className="text-lg font-semibold">{films.Runtime}</h1>
        <h1 className="text-lg font-semibold">{films.Genre}</h1>
        <h1 className="text-lg font-semibold">{films.Director}</h1>
        <h1 className="text-lg font-semibold">{films.Writer}</h1>
        <h1 className="text-lg font-semibold">{films.Actors}</h1>
        <p className="mt-4">{films.Plot}</p>
        <h1 className="text-lg font-semibold">{films.Language}</h1>
        <h1 className="text-lg font-semibold">{films.Awards}</h1>
        <h1 className="text-lg font-semibold">{films.Country}</h1>
      </div>
    </div>
  );
};

export default Details;
