import React, { useState, useContext, useEffect } from 'react';
import EventList from '../components/admin/EventList';
import '../styles/Admindashboard.css';
import axiosInstance from '../services/api';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar'
const AdminDashboard = () => {
  const [credentials, setCredentials] = useState({ name: '', date: '', description: '', location: '' });
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosInstance.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Createbtnclicked = async () => {
    const selectedDate = new Date(credentials.date);
    const today = new Date();
    if (!credentials.name || !credentials.date || !credentials.description || !credentials.location) {
      alert('All fields are required');
      return;
    }
    if (selectedDate <= today) {
      alert('The event date must be in the future');
      return;
    }

    const token = user.token;

    try {
      const response = await axiosInstance.post(
        '/events',
        {
          name: credentials.name,
          date: credentials.date,
          description: credentials.description,
          location: credentials.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 201) {
        const newEvent = response.data; 
        setEvents((prevEvents) => [...prevEvents, newEvent]); 
        window.alert('Event Created Successfully');
      } else if (response.status === 400 && response.data.message === 'Event already exists') {
        alert('Event Already Exists');
      } else {
        alert('Invalid event data or some problem occurred.');
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || 'An error occurred. Please try again later.';
      alert(`${errorMessage}`);
    }
  };

  return (
    <div className='admin-dashboard'>
      <Navbar/>

      <div className='add-event-container'>
        <h2>Add a new Event</h2>
        <img
          src='https://thumbs.dreamstime.com/b/add-button-vector-plus-icon-illustration-isolated-white-background-142764698.jpg'
          alt='Add Event'
          className='add-event-button'
          onClick={toggleForm}
        />
      </div>

      {showForm && (
        <div className='form-container'>
          <form className='event-form'>
            <h3>Create a new event</h3>
            <input
              type='text'
              name='name'
              value={credentials.name}
              onChange={handleChange}
              placeholder='Event Name'
              required
            />
            <input
              type='date'
              name='date'
              value={credentials.date}
              onChange={handleChange}
              required
            />
            <textarea
              name='description'
              value={credentials.description}
              onChange={handleChange}
              placeholder='Event Description'
              required
            />
            <input
              type='text'
              name='location'
              value={credentials.location}
              onChange={handleChange}
              placeholder='Event Location'
              required
            />
            <button type='button' onClick={Createbtnclicked}>Submit</button>
          </form>
        </div>
      )}

      <EventList events={events} setEvents={setEvents} /> 
    </div>
  );
};

export default AdminDashboard;
