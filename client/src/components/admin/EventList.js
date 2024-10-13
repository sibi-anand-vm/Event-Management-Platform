import { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../services/api';
import '../../styles/EventList.css'; 
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null); 
  const [editForm, setEditForm] = useState({ name: '', date: '', description: '', location: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosInstance.get('/events'); 
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    const token = user.token;

    if (user.role !== "admin") {
      alert('Unauthorized action');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axiosInstance.delete(`/events/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== id));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting the event:', error);
      alert('Failed to delete the event. Please try again.');
    }
  };

  const handleEditClick = (event) => {
    setEditingEventId(event._id); 
    setEditForm({ 
      name: event.name,
      date: new Date(event.date).toISOString().substr(0, 10), 
      description: event.description,
      location: event.location 
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleregClick = async (eventId) => {
    const token = user.token;
  
    try {
      const response = await axiosInstance.post(`/events/${eventId}/register`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert('Successfully registered for the event!');
        const updatedEvents = events.map((event) =>
          event._id === eventId ? { ...event, registrations: [...event.registrations, user] } : event
        );
        setEvents(updatedEvents);
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || 'Failed to register for the event. Please try again.';
      alert(errorMessage);
    }
  };
  

  const handleUpdateEvent = async (id) => {
    const token = user.token;
    if (user.role !== "admin") {
      alert('Unauthorized action');
      return;
    }

    try {
      await axiosInstance.put(`/events/${id}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedEvents = events.map((event) =>
        event._id === id ? { ...event, ...editForm } : event
      );
      setEvents(updatedEvents);
      setEditingEventId(null); 
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating the event:', error);
      alert('Failed to update the event. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (events.length === 0) {
    return <p>No events available. Add some events to see them here.</p>;
  }

  return (
    <div className="event-list-container">
      <h2>All Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div 
            key={event._id} 
            className="event-card" 
            onClick={() => navigate(`/events/${event._id}`)} 
          >
            <div className="event-card-content">
              <div className="event-card-header">
                <h1>{event.name}</h1>
                {user.role === "admin" && (
                  <div className="event-card-actions">
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(event); }} 
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => { e.stopPropagation(); deleteEvent(event._id); }} 
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className='event-card-header'> 
                <p>Location: {event.location}</p>
                <button
                  className="reg-btn"
                  onClick={(e) => { e.stopPropagation(); handleregClick(event._id); }} 
                >
                  Register
                </button>
                <p><b>Registrations:</b> {event.registrations.length}</p>
              </div>
             
              {editingEventId === event._id && (
                <div className="edit-form" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleFormChange}
                    placeholder="Event Name"
                  />
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleFormChange}
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleFormChange}
                    placeholder="Event Description"
                  ></textarea>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleFormChange}
                    placeholder="Event Location"
                  />
                  <button onClick={() => handleUpdateEvent(event._id)}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
