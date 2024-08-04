import React, { useEffect, useRef, useState } from "react";
import axios from "../services/axios";
import Image from "react-bootstrap/Image";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  const rowRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [scrollInterval]);

  if (error || movies?.length === 0) {
    return null;
  }

  const handleScroll = (direction) => {
    stopScroll(); 
    const newInterval = setInterval(() => {
      if (rowRef.current) {
        rowRef.current.scrollLeft += direction === 'left' ? -50 : 50;
      }
    }, 100);
    setScrollInterval(newInterval);
  };

  const stopScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  

  return (
    <div className="bg-dark d-flex flex-column p-2 pb-4">
      <h2 className="text-light align-self-start mx-2 fw-bolder">{title}</h2>
      <div className="d-flex flex-row position-relative">
      <div  ref={rowRef} className="d-flex flex-row posters-row w-100">
        {movies.map((movie) => (
          <Image
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="mx-2 poster"
            key={movie.id}
            src={`${baseUrl}${movie?.poster_path}`}
          />
        ))}
      </div>
      <div onMouseEnter={() => handleScroll('left')} onMouseLeave={stopScroll} className="fixed-left">
      &lt;
    </div>
      <div onMouseEnter={() => handleScroll('right')} onMouseLeave={stopScroll} className="fixed-right">
      &gt;
    </div>
      </div>

    </div>
  );
};

export default Row;
