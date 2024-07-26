import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import Image from "react-bootstrap/Image";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(`/genre/${title}`);
        setMovies(request.data.results);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [title]);

  if (error || movies.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark d-flex flex-column p-2 pb-4">
      <h2 className="text-light align-self-start mx-2 fw-bolder">{title}</h2>
      <div className="d-flex flex-row posters-row">
        {movies.map((movie) => (
          <Image
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="mx-2 poster"
            key={movie.id}
            src={`${baseUrl}${movie?.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
