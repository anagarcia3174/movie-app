import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <Spinner animation="border" variant="light">
        </Spinner>
    </div>
  )
}

export default LoadingScreen