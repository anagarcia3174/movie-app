import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from "react-icons/fa";



const AuthModal = ({show, onHide, isMember, setIsMember}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleIsMember = () => {
        setIsMember((prevIsMember) => !prevIsMember);
      };

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
        <Form>
        <Form.Group className="mb-4">
              <Form.Label className='text-light'>Email address</Form.Label>
              <Form.Control
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
              <Form.Control className="m-2" type={showPassword ? 'text' : 'password'}></Form.Control>
              {showPassword ? <FaEyeSlash size={28} onClick={() => setShowPassword(!showPassword)} fill="white"/> : <FaEye size={28} onClick={() => setShowPassword(!showPassword)} fill="white"/>}
              </div>
            </Form.Group>
            <Button type="submit" style={{backgroundColor: "#06B2DF", borderColor: "#06B2DF"}} className="w-100 ">{isMember ? "Log In" : "Sign Up"}</Button>

        </Form>
        <Button onClick={handleToggleIsMember} style={{color: "#06B2DF", }} className="w-100 border-0 bg-transparent p-4">{isMember ? "Don't have an account? Sign up" : "Already a member? Sign In"}</Button>

      </Modal.Body>
      <Modal.Footer className='border-0 '>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal