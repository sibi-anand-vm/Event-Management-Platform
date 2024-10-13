import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details', error);
      }
    };
    fetchEvent();
  }, [id]);

  return (
    <div>
      {event ? (
        <>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          <p>{event.location}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventDetails;
