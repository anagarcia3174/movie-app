import { React, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const NavbarComponent = () => {
  const user = useSelector(selectUser);
  const [inModalShow, setInModalShow] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        data-bs-theme="dark"
        expand="lg"
        fixed="top"
        sticky="top"
        className="p-2 px-4 navbar-dark bg-dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              width="150"
              src="https://fontmeme.com/permalink/240613/dedcef0e6b4f708bbb5d4b504aff01fa.png"
              alt="comments"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <SearchBar />
            </Nav>
            <Nav>
              {user ? (
                <Button
                  onClick={() => navigate("/profile")}
                  className="bg-transparent border-0"
                >
                  <IoPersonOutline size={20} fill="white" />
                </Button>
              ) : (
                <div>
                  <Button
                    onClick={() => {
                      setInModalShow(true);
                      setIsMember(true);
                    }}
                    style={{
                      backgroundColor: "#06B2DF",
                      borderColor: "#06B2DF",
                    }}
                    className="m-2"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      setInModalShow(true);
                      setIsMember(false);
                    }}
                    style={{
                      backgroundColor: "#06B2DF",
                      borderColor: "#06B2DF",
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal
        show={inModalShow}
        onHide={() => setInModalShow(false)}
        isMember={isMember}
        setIsMember={setIsMember}
      />
    </>
  );
};

export default NavbarComponent;
