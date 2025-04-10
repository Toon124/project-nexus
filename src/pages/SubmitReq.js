import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SubmitRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    startDate: "",
    setupTime: "",
    startTime: "",
    endTime: "",
    presenterName: "",
    presenterCell: "",
    presenterEmail: "",
    tablesChairsNeeded: "",
    eventBuilding: "",
    equipmentNeeded: "",
    numberOfAttendees: "",
    eventDescription: "",
    alternativeLocation1: "",
    alternativeLocation2: "",
    alternativeLocation3: "",
    alternativeLocation4: "",
    publicCalendar: "",
    targetAudience: {
      students: false,
      organizationMembersOnly: false,
      faculty: false,
      staff: false,
      alumni: false,
      community: false,
      boardOfTrustees: false
    },
    handicapAccommodations: false,
    parkingArrangements: false,
    dignitaries: false,
    moneyExchange: false,
    policyAgreement: false,
  });

  const [validated, setValidated] = useState(false);
  const [audienceValidated, setAudienceValidated] = useState(true);

  // Event type options
  const eventTypeOptions = [
    "Banquet",
    "Concert",
    "Performance",
    "Exhibit/Fair",
    "Fundraiser",
    "Lecture",
    "Meeting",
    "Play",
    "Reception",
    "Seminar",
    "Social Event",
    "Sports Event",
    "Training",
    "Wedding",
    "Other"
  ];

  // Load saved form data when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('eventRequestFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    } else {
      // Set default event date (10 days from now) if no saved data
      const today = new Date();
      const tenDaysFromNow = new Date(today);
      tenDaysFromNow.setDate(today.getDate() + 10);
      
      // Format date as YYYY-MM-DD for input type="date"
      const formattedDate = tenDaysFromNow.toISOString().split('T')[0];
      
      setFormData(prevState => ({
        ...prevState,
        eventDate: formattedDate
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("audience_")) {
      // Handle audience checkboxes
      const audienceKey = name.replace("audience_", "");
      setFormData((prevState) => ({
        ...prevState,
        targetAudience: {
          ...prevState.targetAudience,
          [audienceKey]: checked
        }
      }));
      
      // Check if at least one audience option is selected
      const updatedAudience = { ...formData.targetAudience, [audienceKey]: checked };
      const hasSelectedAudience = Object.values(updatedAudience).some(value => value === true);
      setAudienceValidated(hasSelectedAudience);
    } else if (type === "checkbox") {
      // Handle other checkboxes
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
      }));
    } else {
      // Handle other inputs
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Function to get the minimum date (10 days from now)
  const getMinEventDate = () => {
    const today = new Date();
    const tenDaysFromNow = new Date(today);
    tenDaysFromNow.setDate(today.getDate() + 10);
    return tenDaysFromNow.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    
    // Check if at least one audience option is selected
    const hasSelectedAudience = Object.values(formData.targetAudience).some(value => value === true);
    setAudienceValidated(hasSelectedAudience);
    
    if (form.checkValidity() === false || !hasSelectedAudience || !formData.policyAgreement) {
      e.stopPropagation();
      setValidated(true);
      
      // Scroll to the first invalid element
      const firstInvalidElement = document.querySelector('.form-control:invalid, .form-select:invalid, .form-check-input:invalid');
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    console.log("Form Submitted:", formData);
    
    // Save the submitted form data if needed
    localStorage.setItem('submittedEventRequest', JSON.stringify(formData));
    
    // Clear the saved draft form data since it's now submitted
    localStorage.removeItem('eventRequestFormData');
    
    // Navigate to the confirmation page
    navigate('/confirmation');
  };

  // Handle "Back" button click - clear form and go back
  const handleBack = () => {
    // Clear saved form data
    localStorage.removeItem('eventRequestFormData');
    
    // Navigate back to previous page
    window.history.back();
  };

  // Handle "Save & Resume Later" button click
  const handleSaveAndResume = () => {
    // Save current form data to localStorage
    localStorage.setItem('eventRequestFormData', JSON.stringify(formData));
    
    // Show confirmation to user
    alert("Your progress has been saved. You can resume later.");
    
    // Navigate back to previous page
    window.history.back();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Event Request Form</h4>
              <div>
                <Button 
                  variant="outline-secondary" 
                  className="me-2"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  variant="outline-primary"
                  onClick={handleSaveAndResume}
                >
                  Save & Resume Later
                </Button>
              </div>
            </div>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Event Information */}
              <Form.Group className="mb-3">
                <Form.Label>Event Name: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an event name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Type: <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Event Type</option>
                  {eventTypeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select an event type.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Date Should Fall On OR After: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={getMinEventDate()}
                  required
                />
                <Form.Text className="text-muted">
                  Events must be scheduled at least 10 days in advance.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid event date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={formData.eventDate}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid start date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Setup Time: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="setupTime"
                  value={formData.setupTime}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a setup time.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Time: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a start time.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Time: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an end time.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Contact Information */}
              <h5 className="mt-4">Presenter/Secondary Contact</h5>
              <Form.Group className="mb-3">
                <Form.Label>Name: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="presenterName"
                  value={formData.presenterName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cell Phone Number: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="presenterCell"
                  value={formData.presenterCell}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a cell phone number.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="presenterEmail"
                  value={formData.presenterEmail}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Event Details */}
              <h5 className="mt-4">Event Details</h5>
              <Form.Group className="mb-3">
                <Form.Label>Are tables and/or chairs needed for your setup? <span className="text-danger">*</span></Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    id="tablesChairsYes"
                    label="Yes" 
                    name="tablesChairsNeeded" 
                    value="yes" 
                    onChange={handleChange} 
                    checked={formData.tablesChairsNeeded === "yes"}
                    required
                    feedback="Please select an option."
                    feedbackType="invalid"
                  />
                  <Form.Check 
                    type="radio" 
                    id="tablesChairsNo"
                    label="No" 
                    name="tablesChairsNeeded" 
                    value="no" 
                    onChange={handleChange} 
                    checked={formData.tablesChairsNeeded === "no"}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Building: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="eventBuilding"
                  value={formData.eventBuilding}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the event building.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Equipment Needed: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="equipmentNeeded"
                  value={formData.equipmentNeeded}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please specify equipment needed or write "None".
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of Attendees: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfAttendees"
                  value={formData.numberOfAttendees}
                  onChange={handleChange}
                  required
                  min="1"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid number of attendees.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Description: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleChange}
                  style={{ minHeight: "150px", resize: "none" }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an event description.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Alternative Locations */}
              <h5 className="mt-4">Alternative Locations</h5>
              <Alert variant="secondary">
                <p>Please provide a <strong>minimum</strong> of 3 alternative locations to host your event if the primary location is unavailable for the requested date/time. If a different location would require a different set up, please include the set-up information here as well.</p>
                <p>For example, if the primary location listed on form is Appleton Room with 200 chairs, other location options would be listed in this section as follows:</p>
                <ol>
                  <li>Multipurpose Room 100 chairs</li>
                  <li>Park Johnson 122 (as is)</li>
                  <li>Library 3rd floor classroom (as is)</li>
                </ol>
              </Alert>

              <Form.Group className="mb-3">
                <Form.Label>2nd Option: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="alternativeLocation1"
                  value={formData.alternativeLocation1}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a 2nd location option.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>3rd Option: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="alternativeLocation2"
                  value={formData.alternativeLocation2}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a 3rd location option.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>4th Option: <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="alternativeLocation3"
                  value={formData.alternativeLocation3}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a 4th location option.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Marketing & Communications */}
              <h5 className="mt-4">Marketing & Communications</h5>
              <Form.Group className="mb-3">
                <Form.Label>Should this event be placed on the PUBLIC master calendar for the University? <span className="text-danger">*</span></Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    id="publicCalendarYes"
                    label="Yes" 
                    name="publicCalendar" 
                    value="yes" 
                    onChange={handleChange} 
                    checked={formData.publicCalendar === "yes"}
                    required
                    feedback="Please select an option."
                    feedbackType="invalid"
                  />
                  <Form.Check 
                    type="radio" 
                    id="publicCalendarNo"
                    label="No" 
                    name="publicCalendar" 
                    value="no" 
                    onChange={handleChange} 
                    checked={formData.publicCalendar === "no"}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Target Audience (Select at least one): <span className="text-danger">*</span></Form.Label>
                <div className={!audienceValidated && validated ? "is-invalid" : ""}>
                  <Form.Check
                    type="checkbox"
                    label="Students"
                    name="audience_students"
                    checked={formData.targetAudience.students}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Organization Members Only"
                    name="audience_organizationMembersOnly"
                    checked={formData.targetAudience.organizationMembersOnly}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Faculty"
                    name="audience_faculty"
                    checked={formData.targetAudience.faculty}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Staff"
                    name="audience_staff"
                    checked={formData.targetAudience.staff}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Alumni"
                    name="audience_alumni"
                    checked={formData.targetAudience.alumni}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Community"
                    name="audience_community"
                    checked={formData.targetAudience.community}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Board of Trustees"
                    name="audience_boardOfTrustees"
                    checked={formData.targetAudience.boardOfTrustees}
                    onChange={handleChange}
                  />
                </div>
                {!audienceValidated && validated && (
                  <div className="invalid-feedback d-block">
                    Please select at least one target audience.
                  </div>
                )}
              </Form.Group>

              {/* Special Instructions */}
              <h5 className="mt-4">Special Instructions</h5>
              <Form.Group className="mb-3">
                <Form.Label>Select all that apply:</Form.Label>
                <Form.Check 
                  type="checkbox" 
                  label="Handicap accommodations" 
                  name="handicapAccommodations"
                  onChange={handleChange}
                  checked={formData.handicapAccommodations}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Parking arrangements" 
                  name="parkingArrangements"
                  onChange={handleChange}
                  checked={formData.parkingArrangements}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Dignitaries attending" 
                  name="dignitaries"
                  onChange={handleChange}
                  checked={formData.dignitaries}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Exchange or collection of money" 
                  name="moneyExchange"
                  onChange={handleChange}
                  checked={formData.moneyExchange}
                />
              </Form.Group>

              {/* Policy Agreement */}
              <h5 className="mt-4 pt-3 border-top fw-bold">Policy Agreement</h5>
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="policyAgreement"
                  name="policyAgreement"
                  checked={formData.policyAgreement}
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.policyAgreement}
                  label={<strong>I have read and understand the statements above. I will adhere to the policies in place surrounding events.</strong>}
                  className="p-2 border border-secondary rounded"
                  feedback="You must agree to the policies to submit this form."
                  feedbackType="invalid"
                />
              </Form.Group>

              {/* Buttons Row */}
              <Row className="mt-4">
                <Col xs={12} md={4} className="mb-2 mb-md-0">
                  <Button 
                    variant="secondary" 
                    type="button" 
                    className="w-100"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Col>
                <Col xs={12} md={4} className="mb-2 mb-md-0">
                  <Button 
                    variant="primary" 
                    type="button" 
                    className="w-100"
                    onClick={handleSaveAndResume}
                  >
                    Save & Resume Later
                  </Button>
                </Col>
                <Col xs={12} md={4}>
                  <Button variant="primary" type="submit" className="w-100">
                    Submit Request
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitRequestPage;