import React from "react";
import { Alert, Modal } from "react-bootstrap";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { reauthenticateUser, deleteUserAccount, auth} from "../services/firebase"
import axios, { isAxiosError } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const DeleteAccountModal = ({ show, onHide }) => {
const [errorText, setErrorText] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);


const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorText) {
      // Check if errorAlert has a value
      setErrorText(""); // If it does, reset it to an empty string
    }
  };


const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password || password.trim() === "") {
        setErrorText("Please enter your password to delete your account.");
        setIsLoading(false);
        return;
    }

    try{
    // Call to reauthenticate user. Func from firebase.js is => reauthenticateUser
        await reauthenticateUser(password);
    
    // Call to delete comments. Route is => /deleteAll/:userId
        const token  = await auth.currentUser.getIdToken();
        const headers = {
            "Authorization": `Bearer ${token}`,
        }
        await axios.delete(`/deleteAll/${auth.currentUser.uid}`, {headers});

    // Call to delete account. Func from firebase.js is => deleteUserAccount
        await deleteUserAccount();

        navigate("/")
    }catch(error){

        if (isAxiosError(error)){
            setErrorText(error.response.data.error || "There was an error deleting your account. Please try again later.");
        } else{

            setErrorText(error.message || "There was an error deleting your account. Please try again later.");
        }
    } finally {
        setIsLoading(false);
    }

}


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
          className="fw-bolder ms-auto text-danger"
        >
          Delete Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="d-flex flex-column align-items-start p-1 text-light">
          <div className="mb-4">
            <h5 className="mb-3">What happens when you delete your account:</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
                <Badge bg="warning" pill className="me-3 p-2">!</Badge>
                <div>
                  <strong>All Comments Will Be Deleted</strong>
                  <p className="mb-0">
                    All comments you've posted will be permanently removed from our platform.
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
                <Badge bg="warning" pill className="me-3 p-2">!</Badge>
                <div>
                  <strong>Account Access Terminated</strong>
                  <p className="mb-0">
                    Your account will be permanently deleted and you won't be able to log in again.
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light border-0 d-flex align-items-center">
                <Badge bg="warning" pill className="me-3 p-2 text-center">!</Badge>
                <div>
                  <strong>This Action Cannot Be Undone</strong>
                  <p className="mb-0">
                    Once confirmed, this process cannot be reversed. All data will be permanently lost.
                  </p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </Modal.Body>
      {errorText && <Alert variant="danger" className="mb-2 mx-2">{errorText}</Alert>}
      <Modal.Footer className="border-0 w-100 bg-transparent d-flex justify-content-start">
        <Form className="w-100">
          <Form.Label className="text-light">Enter your password to delete your account.</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            autoFocus
            className="mb-4"
          />
          <Button
          enabled={!isLoading}
                onClick={handleDeleteAccount}
              type="submit"
              variant="danger"
              className="w-100 "
            >
              {isLoading ? <Spinner animation="border" /> : "DELETE ACCOUNT"}
            </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
