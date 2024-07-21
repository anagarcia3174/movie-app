import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../services/axios'
import '../components/styles.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';


const MediaScreen = () => {
  const comments = [
    {
      userName: "MovieBuff123",
      userId: "user_abc123",
      comment: "This scene was absolutely mind-blowing!",
      movieName: "Inception",
      movieId: "519182",
      upVotes: 15,
      downVotes: 2,
      commentId: "comment_xyz789",
      timeStamp: "5",
      dateOfComment: "2024-07-19T14:30:00Z"
    },
    {
      userName: "CinemaFan2000",
      userId: "user_def456",
      comment: "I didn't quite understand this part. Can someone explain?",
      movieName: "Interstellar",
      movieId: "519182",
      upVotes: 7,
      downVotes: 1,
      commentId: "comment_uvw321",
      timeStamp: "1000",
      dateOfComment: "2024-07-19T15:45:00Z"
    },
    {
      userName: "FilmCritic101",
      userId: "user_ghi789",
      comment: "The cinematography in this sequence is outstanding.",
      movieName: "The Grand Budapest Hotel",
      movieId: "519182",
      upVotes: 22,
      downVotes: 3,
      commentId: "comment_rst654",
      timeStamp: "4000",
      dateOfComment: "2024-07-19T16:20:00Z"
    }
  ];

    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const baseUrl = 'https://image.tmdb.org/t/p/original'
    const [timestamp, setTimestamp] = useState(0.00)
    const [filteredComments, setFilteredComments] = useState([])


    useEffect(() => {
        async function fetchMovie() {
            const request = await axios.get(`/movie/${id}`)
            setMovie(request.data)
        }

        fetchMovie()
    }, [id])

    const backgroundStyle = movie?.backdrop_path
        ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, .6)), url(${baseUrl}${movie.backdrop_path})`}
        : {}

    const handleTimestampChange = (e) => {
      const newTimestamp = parseFloat(e.target.value);
      setTimestamp(newTimestamp);
      setFilteredComments(getComments(newTimestamp));
      
    }

    const formatTime = (time) => {
      const hours = Math.floor(time / 3600)
      const minutes = Math.floor((time % 3600) /60)
      const seconds = Math.floor(time % 60)

      if(hours <= 0){
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const formatString = (str) => {
      return (str?.length > 150) ? str.slice(0, 125) + '...' : str;
    }

    const getComments = (currentTimeStamp) => {
      return comments.filter(comment => {
        return Math.abs(comment.timeStamp - currentTimeStamp) <= 10;
      })
    }

  return (
    <>
      <div className='vh-100 bg-dark background-image d-flex align-items-center justify-content-center' style={backgroundStyle}>
        <Container fluid="md" className="rounded bg-dark " >
          <Row className="p-3">
            <Col className="text-light text-start d-flex flex-column align-items-start ">
              <h1 >{movie?.title || movie?.name || movie?.original_title}</h1>
              <h6 className="w-50">{formatString(movie?.overview)}</h6>
            </Col>
          </Row>
          <Row className="p-3">
            <Col lg={1} xs="3" >
          <h5 className='text-light \'>{formatTime(timestamp)}</h5>
            </Col>
            <Col>
          <Form.Range
            min={0}
            max={movie?.runtime * 60}
            step={0.01}
            defaultValue={timestamp}
            onChange={handleTimestampChange}
          />
            </Col>
          </Row>
          <ListGroup data-bs-theme="dark">
            {
              filteredComments.map((comment) =>(
                <ListGroup.Item variant="light">
                  <h5>{comment.userName}</h5>
                  <h6>{comment.comment}</h6>
                </ListGroup.Item>
              ))
            }
          </ListGroup>

        </Container>
      </div>
    </>
  )
}

export default MediaScreen