import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../services/firebase"
import Alert from 'react-bootstrap/Alert'
import errorMessages from '../services/firebase';
import Spinner  from 'react-bootstrap/Spinner';

const AuthModal = ({show, onHide, isMember, setIsMember}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleIsMember = () => {
        setIsMember((prevIsMember) => !prevIsMember);
        setErrorAlert("");
      };

      useEffect(() => {
        return () => {
          setErrorAlert(""); // Reset errorAlert when the component unmounts
        };
      }, [show]);

    const handleEmailChange = (e) => {
      setEmail(e.target.value)
      if (errorAlert) { // Check if errorAlert has a value
    setErrorAlert(""); // If it does, reset it to an empty string
  }
    };
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (errorAlert) { // Check if errorAlert has a value
    setErrorAlert(""); // If it does, reset it to an empty string
  }

    }

    const handleSignUp = (e) => {
      e.preventDefault();
      
      if(!email || !password){
        return;
      }

      setIsLoading(true);
      
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        onHide();
      }).catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const customMessage = errorMessages[errorCode]
        setErrorAlert(customMessage || "Error. Please try again later.");
      })

    };

    const handleLogIn = (e) => {
      e.preventDefault();

      if(!email || !password){
        return;
      }

      setIsLoading(true);

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        onHide();
      }).catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const customMessage = errorMessages[errorCode]
        setErrorAlert(customMessage);
      })    };

  return (
    <Modal
    data-bs-theme="dark"
    show={show}
    onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen='sm-down'
      centered

    >
      <Modal.Header closeButton  className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bolder ms-auto text-light">
          {isMember ? "Log in to Comments!" : "Sign Up!"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        {errorAlert ? <Alert variant={'danger'}>{errorAlert}</Alert> : <></>}
        <Form>
        <Form.Group className="mb-4">
              <Form.Label className='text-light'>Email address</Form.Label>
              <Form.Control
                onChange={handleEmailChange}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
        </Form.Group>
        <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='text-light' >Password</Form.Label>
              <div className="d-flex align-items-center">
              <Form.Control onChange={handlePasswordChange} className="m-2" type={showPassword ? 'text' : 'password'}></Form.Control>
              {showPassword ? <FaEyeSlash size={28} onClick={() => setShowPassword(!showPassword)} fill="white"/> : <FaEye size={28} onClick={() => setShowPassword(!showPassword)} fill="white"/>}
              </div>
            </Form.Group>
            {isMember ? 
            <Button onClick={handleLogIn} type="submit" style={{backgroundColor: "#06B2DF", borderColor: "#06B2DF"}} className="w-100 ">{isLoading ? <Spinner animation="border"/> : "Log In"}</Button> : 
            <Button onClick={handleSignUp} type="submit" style={{backgroundColor: "#06B2DF", borderColor: "#06B2DF"}} className="w-100 ">{isLoading ? <Spinner animation="border"/> : "Sign Up"}</Button>}

        </Form>
        <Button onClick={handleToggleIsMember} style={{color: "#06B2DF", }} className="w-100 border-0 bg-transparent p-4">{isMember ? "Don't have an account? Sign up" : "Already a member? Sign In"}</Button>

      </Modal.Body>
      <Modal.Footer className='border-0 '>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal