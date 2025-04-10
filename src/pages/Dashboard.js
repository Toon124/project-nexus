import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const localizer = momentLocalizer(moment);

function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 15));

  // Mock Events Data with different statuses
  const allEvents = [
    {
      id: 1,
      title: "Tech Conference",
      start: new Date(2025, 3, 15, 10, 0),
      end: new Date(2025, 3, 15, 15, 0),
      details: "Tech talks and networking event.",
      location: "Convention Center",
      organizer: "Tech Association",
      status: "approved"
    },
    {
      id: 2,
      title: "Art Exhibition",
      start: new Date(2025, 3, 18, 12, 0),
      end: new Date(2025, 3, 18, 18, 0),
      details: "Local artists showcasing their work.",
      location: "Downtown Gallery",
      organizer: "Arts Council",
      status: "pending"
    },
    {
      id: 3,
      title: "Music Festival",
      start: new Date(2025, 3, 22, 14, 0),
      end: new Date(2025, 3, 22, 23, 0),
      details: "Live bands and performances all day.",
      location: "City Park",
      organizer: "Sound Productions",
      status: "approved"
    },
    {
      id: 4,
      title: "Yoga Retreat",
      start: new Date(2025, 3, 25, 8, 0),
      end: new Date(2025, 3, 25, 12, 0),
      details: "Yoga and mindfulness sessions.",
      location: "Wellness Center",
      organizer: "Mindful Living",
      status: "rejected"
    },
    {
      id: 5,
      title: "Career Fair",
      start: new Date(2025, 3, 10, 9, 0),
      end: new Date(2025, 3, 10, 16, 0),
      details: "Connect with top employers in the region.",
      location: "University Hall",
      organizer: "Career Services",
      status: "approved"
    },
    {
      id: 6,
      title: "Food Festival",
      start: new Date(2025, 3, 28, 11, 0),
      end: new Date(2025, 3, 28, 20, 0),
      details: "Culinary delights from around the world.",
      location: "Main Street",
      organizer: "Food Network Association",
      status: "pending"
    },
  ];

  // Set up approved events when component mounts
  useEffect(() => {
    // Deep clone the events to ensure no reference issues
    const approved = allEvents
      .filter(event => event.status === "approved")
      .map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
    
    console.log("Approved events:", approved); 
    setCalendarEvents(approved);
  }, []);

  // Handle date navigation
  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  // Status icon components with both class and inline styles
  const StatusIcon = ({ status }) => {
    switch (status) {
      case "approved":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success" style={{color: '#28a745'}}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case "pending":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning" style={{color: '#ffc107'}}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case "rejected":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger" style={{color: '#dc3545'}}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // Custom Event Component with Tooltip
  const EventComponent = ({ event }) => {
    return (
      <Tippy 
        content={
          <div className="p-2">
            <div><strong>{event.title}</strong></div>
            <div>{moment(event.start).format('LT')} - {moment(event.end).format('LT')}</div>
            <div>{event.details}</div>
            <div><strong>Location:</strong> {event.location}</div>
            <div><strong>Organizer:</strong> {event.organizer}</div>
          </div>
        }
        placement="top"
        arrow={true}
        interactive={true}
      >
        <div className="rbc-event-content">
          {event.title}
        </div>
      </Tippy>
    );
  };

  // Event style customization
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#28a745',
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontWeight: '600'
      }
    };
  };

  // Get status color for card border
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "border-success";
      case "pending":
        return "border-warning";
      case "rejected":
        return "border-danger";
      default:
        return "";
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
      
        {/* Left Side: Event Requests */}
        <div
          className="col-md-3 d-flex flex-column"
          style={{ height: "600px", overflowY: "auto" }}
        >
          <h2 className="mb-3 text-center">Your Event Requests</h2>
          <div className="d-flex flex-column gap-3">
            {allEvents.map((event) => (
              <div 
                key={event.id} 
                className={`card p-3 border-2 ${getStatusColor(event.status)}`}
                onClick={() => setSelectedEvent(event)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <h5>{event.title}</h5>
                  <StatusIcon status={event.status} />
                </div>
                <p className="mb-1"><strong>Date:</strong> {moment(event.start).format('MMM DD, YYYY')}</p>
                <p className="mb-1"><strong>Time:</strong> {moment(event.start).format('LT')} - {moment(event.end).format('LT')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Calendar */}
        <div className="col-md-9">
          <h2 className="mb-3 text-center">Upcoming Approved Events</h2>
          <div
            style={{
              height: "600px",
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          >
            {/* Debug info */}
            {calendarEvents.length === 0 && 
              <div className="alert alert-info mb-2">No approved events found to display</div>
            }
            
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              onSelectEvent={(event) => setSelectedEvent(event)}
              onNavigate={handleNavigate}
              date={currentDate}
              onView={(view) => console.log("View changed:", view)}
              eventPropGetter={eventStyleGetter}
              components={{
                event: EventComponent
              }}
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>

          {/* Event Details Popup */}
          {selectedEvent && (
            <div className="card p-3 mt-3">
              <div className="d-flex justify-content-between align-items-start">
                <h4>{selectedEvent.title}</h4>
                <button
                  className="btn btn-sm btn-close"
                  onClick={() => setSelectedEvent(null)}
                />
              </div>
              <p className="mb-1"><strong>Date:</strong> {moment(selectedEvent.start).format('MMMM DD, YYYY')}</p>
              <p className="mb-1"><strong>Time:</strong> {moment(selectedEvent.start).format('LT')} - {moment(selectedEvent.end).format('LT')}</p>
              <p className="mb-1"><strong>Location:</strong> {selectedEvent.location}</p>
              <p className="mb-1"><strong>Organizer:</strong> {selectedEvent.organizer}</p>
              <p className="mb-1"><strong>Details:</strong> {selectedEvent.details}</p>
              <div className="d-flex align-items-center">
                <strong className="me-2">Status:</strong>
                <StatusIcon status={selectedEvent.status} />
                <span className="ms-1">
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;