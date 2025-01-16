import React, { useState } from "react";
import { Alert, Modal, Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { auth } from "../services/firebase";
import axios from "../services/axios";


const ReportCommentModal = ({ show, onHide, comment }) => {
  const [errorText, setErrorText] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const user = useSelector(selectUser);
  const  [alertVariant, setAlertVariant] = useState("danger");
  const [isLoading, setIsLoading] = useState(false);

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
    setErrorText(""); 

    if (e.target.value !== "other"){
        setOtherReason("");
    }
  }

  const handleModalClose = () => {
    setSelectedReason("");
    setOtherReason("");
    setErrorText("");
    onHide();
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(!user){
      setAlertVariant("danger");
      setErrorText("You must be logged in to report a comment.");
      setIsLoading(false);
      return;
    }

    if(!selectedReason){
      setAlertVariant("danger");
        setErrorText("Please select a reason for reporting the comment.");
        setIsLoading(false);
        return;
    }

    if(selectedReason === "other" && !otherReason.trim()){
      setAlertVariant("danger");
        setErrorText("Please provide a reason for reporting the comment.");
        setIsLoading(false);
        return;
    }
    

    try{
      const token = await auth.currentUser.getIdToken();
      const headers = {
        "Authorization": `Bearer ${token}`
      }
      await axios.post("/report", {
        commentId: comment._id,
        reason: selectedReason,
        ...(selectedReason === "other" && {details:  otherReason.trim()})
      }, {headers});
      setAlertVariant("success");
      setErrorText("Comment reported successfully.");
      setTimeout(() => {
        handleModalClose();
      }, 1500);
    }catch (error){
      setAlertVariant("danger");
      setErrorText(error.response.data.error || "There was an error reporting the comment.");
    } finally {
      setIsLoading(false);
    }
    

  }

  return (
    <Modal
      data-bs-theme="dark"
      show={show}
      onHide={handleModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="sm-down"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bolder ms-auto text-light"
        >
          Report Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="text-light">Reason</Form.Label>
            <Form.Select value={selectedReason} onChange={handleReasonChange}>
                <option value="">Select a reason</option>
              <option value="harassment">Harassment or Bullying</option>
              <option value="hate_speech">Hate Speech</option>
              <option value="spoilers">Spoilers or Incorrect Timestamp</option>
              <option value="spam">Spam</option>
              <option value="misinformation">
                False or Misleading Information
              </option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="offensive">Offensive Language</option>
              <option value="off_topic">Off-topic/Irrelevant</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          {selectedReason === "other" && (
            <Form.Group className="mb-4">
              <Form.Label className="text-light">Please specify</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={otherReason}
                onChange={(e) => {setOtherReason(e.target.value); setErrorText("");}}
                placeholder="Please provide details about your report..."
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      {errorText && (
        <Alert variant={alertVariant} className="mb-2 mx-2">
          {errorText}
        </Alert>
      )}
      <Modal.Footer className="border-0 w-100 bg-transparent d-flex justify-content-start">
        <Button onClick={handleSubmit} type="submit" variant="success" className="w-100 ">
        {isLoading ? <Spinner animation="border" /> : "Report Comment"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportCommentModal;
