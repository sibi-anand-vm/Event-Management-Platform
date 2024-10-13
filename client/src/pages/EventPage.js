import EventList from '../components/admin/EventList';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';
import axiosInstance from '../services/api';
import '../styles/Eventpage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="Eventpage">
      <Navbar />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search events by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <EventList events={filteredEvents} setEvents={setEvents} /> 
    </div>
  );
};

export default EventPage;
