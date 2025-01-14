import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  signIn,
  sendResetPasswordEmail,
} from "../services/firebase";

const AuthModal = ({ show, onHide, isMember, setIsMember }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [alertVariant, setAlertVariant] = useState("danger");

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
    setEmail(e.target.value);
    if (errorAlert) {
      // Check if errorAlert has a value
      setErrorAlert(""); // If it does, reset it to an empty string
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorAlert) {
      // Check if errorAlert has a value
      setErrorAlert(""); // If it does, reset it to an empty string
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await createUser(email, password);
      onHide();
      navigate("/profile");
    } catch (error) {
      setAlertVariant("danger");
      setErrorAlert(error.message || "Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      onHide();
      navigate("/");
    } catch (error) {
      setAlertVariant("danger");
      setErrorAlert(error.message || "Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || email === "") {
      setAlertVariant("danger");
      setErrorAlert("Please enter your email address.");
      return;
    }

    try {
      await sendResetPasswordEmail(email);
      setAlertVariant("success");
      setErrorAlert("Password reset email sent. Check your inbox!");
    } catch (error) {
      setAlertVariant("danger");
      setErrorAlert(
        error.message ||
          "Error sending you reset password email. Please try again later."
      );
    }
  };

  return (
    <Modal
      data-bs-theme="dark"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bolder ms-auto text-light"
        >
          {isMember ? "Log in to " : "Sign Up!"}
          <strong style={{ color: "#06B2DF" }}>
            {isMember ? "Comments!" : ""}
          </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-between">
        {errorAlert ? (
          <Alert variant={alertVariant}>{errorAlert}</Alert>
        ) : (
          <></>
        )}
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              onChange={handleEmailChange}
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="text-light">Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
              ></Form.Control>
              {showPassword ? (
                <FaEyeSlash
                  className="m-2"
                  size={28}
                  onClick={() => setShowPassword(!showPassword)}
                  fill="white"
                />
              ) : (
                <FaEye
                  size={28}
                  className="m-2"
                  onClick={() => setShowPassword(!showPassword)}
                  fill="white"
                />
              )}
            </div>
            {isMember ? (
              <div className="d-flex justify-content-end mt-2">
                <Button
                  onClick={handleResetPassword}
                  style={{ color: "#06B2DF" }}
                  className="border-0 bg-transparent"
                >Forgot Password?
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Form.Group>
          {isMember ? (
            <Button
              onClick={handleLogIn}
              type="submit"
              style={{ backgroundColor: "#06B2DF", borderColor: "#06B2DF" }}
              className="w-100 "
            >
              {isLoading ? <Spinner animation="border" /> : "Log In"}
            </Button>
          ) : (
            <Button
              onClick={handleSignUp}
              type="submit"
              style={{ backgroundColor: "#06B2DF", borderColor: "#06B2DF" }}
              className="w-100 "
            >
              {isLoading ? <Spinner animation="border" /> : "Sign Up"}
            </Button>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 "><Button
          onClick={handleToggleIsMember}
          className="w-100 border-0 bg-transparent px-4"
        >
          {isMember ? "Don't have an account? " : "Already a member? "}
          <strong style={{ color: "#06B2DF" }}>
            {isMember ? "Sign Up!" : "Sign In!"}
          </strong>
        </Button></Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
