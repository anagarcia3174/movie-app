import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../services/axios";
import "../components/styles.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "../components/styles.css";
import Dropdown from "react-bootstrap/Dropdown";
import { FaPlay, FaPause, FaArrowLeft } from "react-icons/fa";


const MediaScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [timestamp, setTimestamp] = useState(0.0);
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [postError, setPostError] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rangeInputRef = useRef(null);
  const controlHoursRef = useRef(null);
  const controllMinutesRef = useRef(null);
  const controlSecondsRef = useRef(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const request = await axios.get(`/movie/${id}`);
        setMovie(request.data.movie);
        setComments(request.data.comments);
        setFilteredComments(getComments(request.data.comments, timestamp));
        setError(false);
      } catch (e) {
        setError(true);
      }
    }
    fetchMovie();
  }, [id, timestamp]);

  useEffect(() => {
    setFilteredComments(getComments(comments, timestamp));

    if (rangeInputRef.current) {
      rangeInputRef.current.value = timestamp;
    }
  }, [comments, timestamp]);

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    let intervalId;

    if (playing && timestamp < movie?.runtime * 60) {
      intervalId = setInterval(() => {
        setTimestamp(prevTimestamp => {
          const newTimestamp = prevTimestamp + 1;
          if (newTimestamp >= movie?.runtime * 60) {
            setPlaying(false);
            return movie.runtime * 60;
          }
          return newTimestamp;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [playing, timestamp, movie?.runtime]);

  const backgroundStyle = movie?.backdrop_path
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, .6)), url(${baseUrl}${movie.backdrop_path})`,
      }
    : {};

  const handleTimestampChange = (e) => {
    const newTimestamp = parseFloat(e.target.value);
    setTimestamp(newTimestamp);
    setFilteredComments(getComments(comments, newTimestamp));
  };

  // const formatTime = (time) => {
  //   const hours = Math.floor(time / 3600);
  //   const minutes = Math.floor((time % 3600) / 60);
  //   const seconds = Math.floor(time % 60);

  //   if (hours <= 0) {
  //     return `${minutes.toString().padStart(2, "0")}:${seconds
  //       .toString()
  //       .padStart(2, "0")}`;
  //   }

  //   return `${hours.toString().padStart(2, "0")}:${minutes
  //     .toString()
  //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  // };

  const formatString = (str) => {
    return str?.length > 150 ? str.slice(0, 125) + "..." : str;
  };

  const submitComment = async () => {
    if (!user) {
      setPostError("You need to be logged in to comment!");
      return;
    }
    if(user && !user.emailVerified){
      setPostError("You must verify your email to comment.");
      return;
    }
    if (input.trim().length === 0) {
      setPostError("Cannot post empty comment!");
      return;
    }
    const userId = user.uid;
    const movieId = movie._id;
    setPostLoading(true);
    try {
      await axios.post("/comments", {
        userId,
        movieId,
        content: input,
        timestamp,
      });
      setInput("");
      await fetchComments();
    } catch (error) {
      setPostError("Error posting comment! Please try again later.");
    } finally {
      setPostLoading(false);
    }
  };

  const togglePlay = () => {
    setPlaying((prevPlaying) => !prevPlaying)
  }

  const fetchComments = async () => {
    try {
      const request = await axios.get(`/movie/${id}`);
      setComments(request.data.comments);
    } catch (e) {
      setError(e);
    }
  };

  const getComments = (commentsArray, currentTimeStamp) => {
    return commentsArray.filter((comment) => {
      return Math.abs(comment.timestamp - currentTimeStamp) <= 20;
    });
  };

  const inputTimestampChange = () => {
    const hours = parseInt(controlHoursRef.current.value, 10) || 0;
    const minutes = parseInt(controllMinutesRef.current.value, 10) || 0;
    const seconds = parseInt(controlSecondsRef.current.value, 10) || 0;

    const newTimestamp = hours * 3600 + minutes * 60 + seconds;
    setTimestamp(newTimestamp);
    if (rangeInputRef.current) {
      rangeInputRef.current.value = newTimestamp;
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setPostError("");
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);

      await fetchComments();
    } catch(error){
      setPostError("Error deleting comment. Please try again later.")
    }
  };

  const formatTimeValue =  (value) => {
    return value.toString().padStart(2, '0')
  }
  return (
    <>
      <div
        className="vh-100 bg-dark background-image d-flex flex-column align-items-center justify-content-center"
        style={backgroundStyle}
      >

    <Button className="position-absolute top-0 start-0 m-2 bg-transparent border-0" onClick={() => navigate(-1)} >
      <FaArrowLeft size={25}/>
    </Button>

        <Container fluid="md" className="bg-dark d-flex flex-column" style={{ maxHeight: '75vh'}}>
          <Row className="p-3">
            <Col className="text-light text-start d-flex flex-column align-items-start ">
              <h1>{movie?.title || movie?.name || movie?.original_title}</h1>
              <h6 className="w-50">{formatString(movie?.overview)}</h6>
            </Col>
          </Row>
          <Row className="py-2">
            <Col className="d-flex align-items-center">
            <Button onClick={togglePlay} className="bg-transparent border-0 d-flex border">
              {
                playing ? <FaPause /> : <FaPlay />
              }
              </Button>
              <Form.Range
                min={0}
                max={`${movie?.runtime * 60}`}
                step={0.001}
                defaultValue={timestamp}
                onChange={handleTimestampChange}
                ref={rangeInputRef}
              />
            </Col>
            <Col lg="2" xs="6" className="d-flex align-items-center w-auto">
              <Form.Control
                className="bg-transparent w-auto border-0 text-light time-input form-control-sm fw-bold"
                id="hours"
                type="number"
                min={0}
                max={60}
                value={formatTimeValue(parseInt(timestamp / 3600))}
                onChange={inputTimestampChange}
                ref={controlHoursRef}
              />
              <span className="mx-1 text-light">:</span>
              <Form.Control
                className="bg-transparent w-auto border-0 text-light time-input form-control-sm fw-bold"
                id="minutes"
                type="number"
                value={formatTimeValue(parseInt((timestamp % 3600) / 60))}
                min={0}
                max={59}
                onChange={inputTimestampChange}
                ref={controllMinutesRef}
              />
              <span className="mx-1 text-light">:</span>
              <Form.Control
                className="bg-transparent w-auto border-0 text-light time-input form-control-sm fw-bold"
                id="seconds"
                type="number"
                value={formatTimeValue(parseInt(timestamp % 60))}
                min={0}
                max={59}
                onChange={inputTimestampChange}
                ref={controlSecondsRef}
              />
              
            </Col>
          </Row>
          <Container
            className="py-4 overflow-scroll flex-grow-1 overflow-auto comments-container"
            data-bs-theme="dark"
          >
            {filteredComments.map((comment) => (
              <Container
                key={comment._id}
                className="bg-secondary rounded text-light my-1 posters-row"
              >
                <Row className="d-flex align-items-center ">
                  <Col lg="1" md="1" sm="2" xs="2" className="w-auto">
                    <Image
                      className="profile"
                      src={comment.photoURL}
                      roundedCircle
                    />
                  </Col>
                  <Col className="d-flex flex-column align-items-start py-3">
                    <h4>{comment.displayName}</h4>
                    <h6 className="text-start">{comment.content}</h6>
                  </Col>
                  {comment.userId === user?.uid ? (
                    <Col
                      lg="1"
                      md="1"
                      sm="2"
                      xs="2"
                      className="d-flex justify-content-end align-self-start pt-3 "
                    >
                      <Dropdown drop='start' className="d-flex justify-content-center align-items-center ">
                        <Dropdown.Toggle className="bg-transparent border-0 ">
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => deleteComment(comment._id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  ) : <></>}
                </Row>
              </Container>
            ))}
          </Container>
        </Container>
        <Container fluid="md" className=" bg-dark py-3">
          {postError.length !== 0 ? (
            <Row className="px-3 d-flex justify-content-center align-items-center">
              <Alert
                className="w-50 h-50"
                data-bs-theme="dark"
                variant="danger"
              >
                {postError}
              </Alert>
            </Row>
          ) : (
            <></>
          )}
          <Row className="px-3 flex-grow-0">
            <Col>
              <Form.Control
                data-bs-theme="dark"
                placeholder="Add a comment..."
                value={input}
                onChange={handleInputChange}
                as="textarea"
                rows={1}
              />
            </Col>
            <Col lg="1" xs="2">
              <Button
                onClick={submitComment}
                variant="outline-primary"
                className="w-100 h-100 d-flex justify-content-center align-items-center"
              >
                {postLoading ? (
                  <Spinner animation="border" />
                ) : (
                  <IoIosSend size={20} />
                )}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MediaScreen;
