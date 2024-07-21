import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUserProfile, verifyUserProfile } from '../redux/slices/userSlice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import  Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import Alert from 'react-bootstrap/Alert'
import errorMessages from '../services/firebase';
import NavbarComponent from '../components/NavbarComponent';

const ProfileScreen = () => {

  const user = useSelector(selectUser);
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [alertText, setalertText] = useState("");
  const [userVerified, setUserVerified] = useState(user.verified);
  const [alertVariant, setAlertVariant] = useState('warning')
  const dispatch = useDispatch();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload()
      if(auth.currentUser.emailVerified){
        setUserVerified(true);
        dispatch(verifyUserProfile());
      }
    }

    checkVerificationStatus();
  }, [dispatch])


  const handleProfileUrlChange = (e) => {
    setProfilePicture(e.target.value);
    setalertText("");
  }
  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    setalertText("");
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    if(!profilePicture || !displayName)
      {
        setAlertVariant('danger')
        setalertText("Don't leave any fields empty.")
        return;
      }


    if(user.photoURL === profilePicture && user.displayName === displayName){
      setAlertVariant('warning')
      setalertText('No changes were made.')
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: displayName, photoURL: profilePicture
    }).then(() => {
      setAlertVariant('success')
      setalertText("Profile updated successfully!")
      dispatch(updateUserProfile({photoURL: profilePicture, displayName: displayName}));
    }).catch((error) => {
        const errorCode = error.code;
        const customMessage = errorMessages[errorCode]
        setAlertVariant('danger')
        setalertText(customMessage || "Error. Please try again later.");
    });

  }

  const handleUserVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setAlertVariant('success')
      setalertText("Verification email sent. Please check your inbox.")
    }).catch((error) => {
      setAlertVariant('danger')
      setalertText("Error sending verification email. Please try again later.")
    })
  }

  return (
    <>
    <NavbarComponent></NavbarComponent>
    <div className="d-flex flex-column  align-items-center vh-100 bg-dark">
      {userVerified ? <></> : <Alert data-bs-theme="dark" variant='warning'>Your email needs to be verified. <Alert.Link onClick={() => handleUserVerification()}>Click here to send a verification email.</Alert.Link></Alert>}
      {alertText ? <Alert data-bs-theme="dark" variant={alertVariant}>{alertText}</Alert> : <></>}
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
      <Button onClick={handleProfileUpdate} variant="success" className=' w-50'>Save Changes</Button>
      <Button onClick={() => auth.signOut()} className='m-5 w-25' variant="danger">Sign Out</Button>
    </div>
    </>

  )
  
}

export default ProfileScreen