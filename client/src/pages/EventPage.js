import EventList from '../components/admin/EventList';
import { useEffect,useState } from 'react';
import Navbar from '../components/Navbar.js'
import axiosInstance from '../services/api';
import '../styles/Eventpage.css'
const EventPage = () => {
  const [events, setEvents] = useState([]);
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
  return (
    <div className='Eventpage'>
     <Navbar/>
    <EventList events={events} setEvents={setEvents} /> 
    </div>
  );
};

export default EventPage;
