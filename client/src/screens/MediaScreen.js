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
import Button from 'react-bootstrap/Button'
import { IoIosSend } from "react-icons/io";
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/userSlice'



const MediaScreen = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const baseUrl = 'https://image.tmdb.org/t/p/original'
    const [timestamp, setTimestamp] = useState(0.00)
    const [filteredComments, setFilteredComments] = useState([])
    const [input, setInput] = useState('');
    const user = useSelector(selectUser);


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
      //setFilteredComments(getComments(newTimestamp));
      
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

    const submitComment = async () => {
      const userId = user.uid;
      const movieId = movie._id;

      try{
        const response = await axios.post('/comments', {
          userId,
          movieId,
          content: input,
          timestamp,
        });
        setInput('')
      } catch (error){
      }
    }

    // const getComments = (currentTimeStamp) => {
    //   return comments.filter(comment => {
    //     return Math.abs(comment.timeStamp - currentTimeStamp) <= 10;
    //   })
    // }

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
            <Col lg="1" xs="3" >
          <h5 className='text-light \'>{formatTime(timestamp)}</h5>
            </Col>
            <Col>
          <Form.Range
            min={0}
            max={`${movie?.runtime * 60}`}
            step={0.01}
            defaultValue={timestamp}
            onChange={handleTimestampChange}
          />
            </Col>
          </Row>
          <Row className="p-3">
              <Col>
              <Form.Control data-bs-theme="dark" placeholder='Add a comment...' value={input} onChange={(e) => setInput(e.target.value)} as="textarea" rows={1} />
              </Col>
              <Col lg="1" xs="2">
              <Button onClick={submitComment} variant="outline-primary" className="w-100 h-100 d-flex justify-content-center align-items-center"><IoIosSend size={20} /></Button>
              </Col>
          </Row>
          {/* <ListGroup data-bs-theme="dark">
            {
              filteredComments.map((comment) =>(
                <ListGroup.Item variant="light">
                  <h5>{comment.userName}</h5>
                  <h6>{comment.comment}</h6>
                </ListGroup.Item>
              ))
            }
          </ListGroup> */}

        </Container>
      </div>
    </>
  )
}

export default MediaScreen