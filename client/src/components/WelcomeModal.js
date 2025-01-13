import React from "react";
import { Modal, Button, ListGroup, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { LuPopcorn } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";




const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (hasSeenWelcome !== "true" && !user) {
      setIsOpen(true);
      
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, [user]);

  const handleClose = () => setIsOpen(false);

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      data-bs-theme="dark"
      fullscreen="sm-down"
      className="d-flex flex-column"
      centered
    >
      <Modal.Header closeButton className="border-0 bg-dark text-light align-items-start">
        <div className=" d-flex flex-column align-items-start p-1">
        <Modal.Title className="fw-bold text-light ">Welcome to <span style={{ color: "#06B2DF" }}>Comments!</span></Modal.Title>
        <h6 className="">Comment on your favorite movie moments as they happen.</h6>
        <div className="mt-4">
        <h5>Key Features:</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
              <Badge bg="dark" pill className="me-3">
              <BiCameraMovie size={26} color="#06B2DF"/>
              </Badge>
              <div>
                <strong>Post Timestamped Comments</strong>
                <p className="mb-0">Share your thoughts at specific moments of any movie.</p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
              <Badge bg="dark"  pill className="me-3">
              <LuPopcorn size={26} color="#06B2DF"/>
              </Badge>
              <div>
                <strong>Discover Community Reactions</strong>
                <p className="mb-0">See what others are saying about your favorite scenes.</p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
              <Badge bg="dark" pill className="me-3">
              <IoRocketOutline size={26} color="#06B2DF"/>
              </Badge>
              <div>
                <strong>Exciting Features Coming Soon</strong>
                <p className="mb-0">Stay tuned for the ability to comment on TV shows, reply to others, like comments, and more!</p>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="mt-3">
          <p>
            Check out the{" "}
            <a
              href="https://github.com/anagarcia3174/movie-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-info"
            >
              GitHub repository
            </a>{" "}
            to explore the code behind this project!
          </p>
          </div>
        </div>
        </div>
      </Modal.Header>
      <div className="flex-grow-1"></div>
      <Modal.Footer className="border-0 bg-dark mt-auto">
        <Button style={{ backgroundColor: "#06B2DF", borderColor: "#06B2DF" }} variant="primary" onClick={handleClose} className="w-100">
          Get Started
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
