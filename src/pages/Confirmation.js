import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('submittedEventRequest');
    const savedId = localStorage.getItem('requestId');

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (savedId) {
      setRequestId(savedId);
    }

    setLoading(false);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmitRequest = () => {
    // Optionally keep requestId or clear it depending on desired behavior
    localStorage.removeItem('submittedEventRequest');
    localStorage.removeItem('requestId');
    navigate('/dashboard');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Provided';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading confirmation...</p>
      </Container>
    );
  }

  if (!formData) {
    return (
      <Container className="mt-5">
        <Card className="p-4">
          <Card.Body className="text-center">
            <h3>No Submission Found</h3>
            <p>We couldn't find any recently submitted event request data.</p>
            <Button 
              variant="primary" 
              className="mt-3" 
              onClick={() => navigate('/submit-request')}
            >
              Submit Request
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const selectedAudiences = Object.entries(formData.targetAudience || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

  const alternativeLocations = [
    formData.alternativeLocation1,
    formData.alternativeLocation2,
    formData.alternativeLocation3,
    formData.alternativeLocation4,
  ].filter(Boolean);

  return (
    <Container className="my-5">
      <Card className="confirmation-card">
        <Card.Header className="bg-success text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Event Request Confirmation</h3>
            <Badge bg="light" text="dark" className="p-2">
              Request ID: {requestId}
            </Badge>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="alert alert-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            Thank you! Your event request has been submitted successfully.
          </div>

          {/* Event Information */}
          <Row className="mt-4">
            <Col md={12}>
              <h4 className="border-bottom pb-2">Event Information</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Event Name:</strong>
                  <span>{formData.eventName}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Event Type:</strong>
                  <span>{formData.eventType}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Event Date:</strong>
                  <span>{formatDate(formData.eventDate)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Start Date:</strong>
                  <span>{formatDate(formData.startDate)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Setup Time:</strong>
                  <span>{formData.setupTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Start Time:</strong>
                  <span>{formData.startTime}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>End Time:</strong>
                  <span>{formData.endTime}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Contact Information */}
          <Row className="mt-4">
            <Col md={12}>
              <h4 className="border-bottom pb-2">Contact Information</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Contact Name:</strong>
                  <span>{formData.contactName}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Email:</strong>
                  <span>{formData.email}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Phone:</strong>
                  <span>{formData.phone}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Department:</strong>
                  <span>{formData.department}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Event Details */}
          <Row className="mt-4">
            <Col md={12}>
              <h4 className="border-bottom pb-2">Event Details</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Preferred Location:</strong>
                  <span>{formData.preferredLocation || "Not Specified"}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Expected Attendance:</strong>
                  <span>{formData.expectedAttendance || "Not Specified"}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong>
                  <p className="mt-2">{formData.eventDescription || "No description provided"}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Alternative Locations */}
          {alternativeLocations.length > 0 && (
            <Row className="mt-4">
              <Col md={12}>
                <h4 className="border-bottom pb-2">Alternative Locations</h4>
                <ListGroup variant="flush">
                  {alternativeLocations.map((location, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Alternative {index + 1}:</strong> {location}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          )}

          {/* Target Audience */}
          {selectedAudiences.length > 0 && (
            <Row className="mt-4">
              <Col md={12}>
                <h4 className="border-bottom pb-2">Target Audience</h4>
                <div className="mt-2">
                  {selectedAudiences.map((audience, index) => (
                    <Badge key={index} bg="info" className="me-2 mb-2 p-2">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </Col>
            </Row>
          )}

          {/* Marketing Information */}
          <Row className="mt-4">
            <Col md={12}>
              <h4 className="border-bottom pb-2">Marketing Information</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Marketing Assistance Needed:</strong>
                  <span>{formData.marketingNeeded ? "Yes" : "No"}</span>
                </ListGroup.Item>
                {formData.marketingNeeded && (
                  <ListGroup.Item>
                    <strong>Marketing Details:</strong>
                    <p className="mt-2">{formData.marketingDetails || "No details provided"}</p>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>

          {/* Special Instructions */}
          {formData.specialInstructions && (
            <Row className="mt-4">
              <Col md={12}>
                <h4 className="border-bottom pb-2">Special Instructions</h4>
                <Card className="bg-light">
                  <Card.Body>
                    <p>{formData.specialInstructions}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Additional Information Alert */}
          <Row className="mt-4">
            <Col>
              <div className="alert alert-info">
                <i className="bi bi-info-circle-fill me-2"></i>
                A copy of this confirmation has been sent to your email. You will be contacted within 3-5 business days regarding the status of your request.
              </div>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer>
          <Row>
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <Button variant="secondary" className="w-100" onClick={handleBack}>
                Back
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Button variant="primary" className="w-100" onClick={handleSubmitRequest}>
                Return to Dashboard
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ConfirmationPage;