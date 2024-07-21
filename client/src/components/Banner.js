import axios from '../services/axios';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

const [movies, setMovies] = useState([]);
const baseUrl = 'https://image.tmdb.org/t/p/original';
const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/genre/Popular`)
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [])

  return (
    <Carousel indicators={false}  controls={true} fade interval={4000} className='bg-dark m-3'>
        {
            movies.slice(0,6).map((movie) => (
<Carousel.Item key={movie.id}>
      <div className="d-flex justify-content-center align-items-center" >
        <Image
          className="d-block banner-image"
          src={`${baseUrl}${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name || movie?.original_title}
        />
      </div>
      <Carousel.Caption className="d-flex flex-column align-items-center">
        <h3 className="w-100">{movie?.title || movie?.name || movie?.original_title}</h3>
        <div>
            <Button onClick={() => navigate(`/movie/${movie.id}`)} style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', border: 'none'}} className="m-2">COMMENT</Button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
            ))
        }
    
    </Carousel>
    
  )
}

export default Banner;
