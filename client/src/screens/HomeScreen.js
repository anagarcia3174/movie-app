import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Banner from '../components/Banner'
import Row from '../components/Row'
import { Button } from 'react-bootstrap'
import '../components/styles.css'
import AuthModal from '../components/AuthModal'


function HomeScreen() {

  const [inModalShow, setInModalShow] = useState(false);
  const [isMember, setIsMember] = useState(true);

  return (
    <div className='bg-dark vh-100'>
    <Navbar expand="lg" fixed="top" sticky="top" className="p-2 navbar-dark bg-dark" >
            <Navbar.Brand><img width='150' src="https://fontmeme.com/permalink/240613/dedcef0e6b4f708bbb5d4b504aff01fa.png" alt='comments'/></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end pe-3'>
              <Button onClick={() => {setInModalShow(true); setIsMember(true)}} style={{backgroundColor: "#06B2DF", borderColor: "#06B2DF"}} className='m-2' >Log In</Button>
              <Button  onClick={() => {setInModalShow(true); setIsMember(false)}} style={{backgroundColor: "#06B2DF", borderColor: "#06B2DF"}} >Sign Up</Button>
            </Navbar.Collapse>
      </Navbar>
      <AuthModal show={inModalShow} onHide={() => setInModalShow(false)} isMember={isMember} setIsMember={setIsMember}/>
      <Banner />
      <Row title="Action" />
      <Row title="Comedy" />
      <Row title="Fantasy" />
      <Row title="Horror" />
      <Row title="Romance" />
      <Row title="Documentary"/>


    </div>
  )
}

export default HomeScreen