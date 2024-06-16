import {React, useState} from 'react'
import Navbar  from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap'
import AuthModal from '../components/AuthModal'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/userSlice'
import { IoPersonOutline } from "react-icons/io5";
  import { useNavigate } from 'react-router-dom'


const NavbarComponent = () => {

    const user = useSelector(selectUser);
    const [inModalShow, setInModalShow] = useState(false);
    const [isMember, setIsMember] = useState(true);
    const navigate = useNavigate();

  return (
    <>
    <Navbar expand="lg" fixed="top" sticky="top" className="p-2 px-4 navbar-dark bg-dark" >
        <Navbar.Brand><img width='150' src="https://fontmeme.com/permalink/240613/dedcef0e6b4f708bbb5d4b504aff01fa.png" alt='comments'/></Navbar.Brand>
            {user ? 
            <Button onClick={() => navigate('/profile')} className="bg-transparent border-0 ms-auto px-4" ><IoPersonOutline size={20} fill="white"/></Button>

            :
            <>
            <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end pe-3'>
                <Button onClick={() => { setInModalShow(true); setIsMember(true) } } style={{ backgroundColor: "#06B2DF", borderColor: "#06B2DF" }} className='m-2'>Log In</Button>
                <Button onClick={() => { setInModalShow(true); setIsMember(false) } } style={{ backgroundColor: "#06B2DF", borderColor: "#06B2DF" }}>Sign Up</Button>
            </Navbar.Collapse>
            </>
            }
            
    </Navbar>
    <AuthModal show={inModalShow} onHide={() => setInModalShow(false)} isMember={isMember} setIsMember={setIsMember}/>
    </>
  )
}

export default NavbarComponent