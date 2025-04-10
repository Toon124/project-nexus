import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    orgEmail: "",
    eventCoordinatorName: "",
    eventCoordinatorCell: "",
    eventCoordinatorEmail: "",
    advisorName: "",
    advisorEmail: "",
    advisorCell: "",
    orgDescription: "",
    profilePic: null,
  });
  
  const [savedProfilePicURL, setSavedProfilePicURL] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("organizationProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(prevData => ({
        ...prevData,
        ...parsedData
      }));
      
      // Load the saved profile picture if it exists
      if (parsedData.profilePicURL) {
        setSavedProfilePicURL(parsedData.profilePicURL);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy of form data to save
    const dataToSave = { ...formData };
    
    // Handle the profile picture - convert to data URL if it exists
    if (formData.profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save the data URL for the image
        const dataWithImage = {
          ...dataToSave,
          profilePicURL: reader.result,
        };
        
        // Remove the File object as it can't be stored in localStorage
        delete dataWithImage.profilePic;
        
        // Save to localStorage
        localStorage.setItem("organizationProfile", JSON.stringify(dataWithImage));
        
        // Update the saved URL for displaying
        setSavedProfilePicURL(reader.result);
        
        // Show success alert
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      };
      
      reader.readAsDataURL(formData.profilePic);
    } else {
      // If no new profile pic, keep the existing URL if any
      if (savedProfilePicURL) {
        dataToSave.profilePicURL = savedProfilePicURL;
      }
      
      // Remove the File object as it can't be stored in localStorage
      delete dataToSave.profilePic;
      
      // Save to localStorage
      localStorage.setItem("organizationProfile", JSON.stringify(dataToSave));
      
      // Show success alert
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
    
    console.log("Form Submitted and Saved:", dataToSave);
  };

  const handleProfilePicClick = () => {
    document.getElementById("profilePicInput").click(); // Trigger file input click
  };

  return (
    <Container className="mt-4">
      {showSuccessAlert && (
        <Alert variant="success" className="mb-3">
          Profile successfully updated and saved!
        </Alert>
      )}
      
      <Row>
        {/* Left Side - Organization Profile */}
        <Col md={8}>
          <Card className="p-4">
            <h4>Organization Profile</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Org Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Org Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="orgEmail"
                  value={formData.orgEmail}
                  onChange={handleChange}
                />
              </Form.Group>

              <h5 className="mt-4">Event Coordinator</h5>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="eventCoordinatorName"
                  value={formData.eventCoordinatorName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cell Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="eventCoordinatorCell"
                  value={formData.eventCoordinatorCell}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="eventCoordinatorEmail"
                  value={formData.eventCoordinatorEmail}
                  onChange={handleChange}
                />
              </Form.Group>

              <h5 className="mt-4">On Campus Advisor</h5>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="advisorName"
                  value={formData.advisorName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="advisorEmail"
                  value={formData.advisorEmail}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cell Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="advisorCell"
                  value={formData.advisorCell}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* Right Side - Spaced Components */}
        <Col md={4} className="d-flex flex-column gap-3">
          {/* Profile Picture */}
          <Card className="p-3 text-center">
            <h5>Profile Picture</h5>
            <div
              className="text-center mb-3 d-flex justify-content-center align-items-center"
              onClick={handleProfilePicClick}
              style={{
                cursor: "pointer",
                width: "100px",
                height: "100px",
                margin: "0 auto",
              }}
            >
              {formData.profilePic ? (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile"
                  className="rounded-circle"
                  width="100"
                  height="100"
                />
              ) : savedProfilePicURL ? (
                <img
                  src={savedProfilePicURL}
                  alt="Profile"
                  className="rounded-circle"
                  width="100"
                  height="100"
                />
              ) : (
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <span>Upload</span>
                </div>
              )}
            </div>
            <Form.Control
              type="file"
              id="profilePicInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <small className="text-muted">Click to upload or change profile picture</small>
          </Card>

          {/* Organization Description */}
          <Card className="p-3">
            <h5>Org Description</h5>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="orgDescription"
                value={formData.orgDescription}
                onChange={handleChange}
                style={{ minHeight: "400px", resize: "none", height: "400px" }}
              />
            </Form.Group>
          </Card>

          {/* Update Profile Button */}
          <Button variant="primary" className="w-100" onClick={handleSubmit}>
            Update Profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
