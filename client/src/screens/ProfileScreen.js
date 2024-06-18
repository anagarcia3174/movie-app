import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUserProfile } from '../redux/slices/userSlice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import  Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import Alert from 'react-bootstrap/Alert'
import errorMessages from '../services/firebase';
import NavbarComponent from '../components/NavbarComponent';

const ProfileScreen = () => {

  const user = useSelector(selectUser);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  //const [email, setEmail] = useState(user?.email || "");
  const [errorAlert, setErrorAlert] = useState("")
  const dispatch = useDispatch();


  const handleProfileUrlChange = (e) => {
    setProfilePicture(e.target.value);
    setErrorAlert("");
  }
  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setErrorAlert("");
  }
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   setErrorAlert("");
  // }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    if(!profilePicture || !displayName)
      {
        setErrorAlert("Don't leave any fields empty.")
        return;
      }


    if(user.photoURL === profilePicture && user.displayName === displayName){
      setErrorAlert('No changes were made.')
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: displayName, photoURL: profilePicture
    }).then(() => {
      dispatch(updateUserProfile({photoURL: profilePicture, displayName: displayName}));
    }).catch((error) => {
        const errorCode = error.code;
        const customMessage = errorMessages[errorCode]
        setErrorAlert(customMessage || "Error. Please try again later.");
    });

  }

  return (
    <>
    <NavbarComponent></NavbarComponent>
    <div className="d-flex flex-column  align-items-center vh-100 overflow-auto bg-dark">
      {errorAlert ? <Alert data-bs-theme="dark" variant='danger'>{errorAlert}</Alert> : <></>}
      <Card className='w-75 p-3 m-4 border-light text-white bg-dark'>
        <Card.Body>
          <Row>
            <Col className="d-flex align-items-center">
            <Row className="text-start">
              <Card.Text className="h5">Profile Picture</Card.Text>
              <Card.Text>Paste an image address below to change it.</Card.Text>
              <Form.Control value={profilePicture} onChange={handleProfileUrlChange} className="mx-2 w-50"></Form.Control>
            </Row>
            </Col>
            <Col className="h3 d-flex justify-content-center align-items-center px-2">
            <Image src={user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }roundedCircle className="w-50 align-self-en"></Image>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className='w-75 p-3 m-4 border-light text-white bg-dark'>
        <Card.Body >
          <Row>
            <Col  className="d-flex align-items-center">
            <Row className="text-start">
              <Card.Text className="h5">Display Name</Card.Text>
              <Card.Text>Enter a display name you'd like.</Card.Text>
              <Form.Control value={displayName} onChange={handleDisplayNameChange} className="mx-2 w-50"></Form.Control>
            </Row>
            </Col>
            <Col className="h3 d-flex justify-content-center align-items-center pt-4 px-2">
              {user.displayName || "No display name yet :("}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Button onClick={handleProfileUpdate} variant="success" className='m-2 w-50'>Save Changes</Button>
      {/* <Card className='w-75 p-3 mt-2 border-light text-white bg-dark'>
        <Card.Body >
          <Row>
            <Col  className="d-flex align-items-center">
            <Row className="text-start">
              <Card.Text className="h5">Email Address</Card.Text>
              <Card.Text>If you'd like to change your email, type it below.</Card.Text>
              <div className="d-flex align-items-center">
            <Form.Control onChange={handleEmailChange} className="mx-2 w-50"></Form.Control>
            <Button variant="success" className="ml-2"><FaCheck />
            </Button>
          </div>            </Row>
            </Col>
            <Col className="h3 d-flex justify-content-center align-items-center px-2 pt-4">
              {user.email}
            </Col>
          </Row>
        </Card.Body>
      </Card> */}
      <Button onClick={() => auth.signOut()} className='m-5 w-25' variant="warning">Sign Out</Button>
    </div>
    </>

  )
  
}

export default ProfileScreen