import React, { useEffect, useState } from 'react';
import axios from '../stuff/axios';
import Image from 'react-bootstrap/Image';
import './styles.css'

const Row = ({title, fetchUrl}) => {

    const [movies, setMovies] = useState([]);
    const baseUrl = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(`/api/${title}`);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [title])


  return (
    <div className='bg-dark d-flex flex-column p-2 pb-4'>
    <h2 className="text-light align-self-start mx-2 fw-bolder" >{title}</h2>
    <div  className='d-flex flex-row posters-row' >
        {movies.map(movie => (
            <Image className="mx-2 poster"  key={movie.id} src={`${baseUrl}${movie?.poster_path}`}/>
        ))}
    </div>
    </div>
  )
}

export default Row