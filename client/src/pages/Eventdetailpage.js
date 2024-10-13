import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/api';
import AuthContext from '../context/AuthContext';
import '../styles/Eventdetailpage.css'; 

const EventDetailsPage = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/events/${id}`);
        setEvent(data);
        setLoading(false);
        setFeedbacks(data.feedback || []); 
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleFeedbackSubmit = async () => {
    if (!newFeedback.trim()) {
      alert('Feedback cannot be empty');
      return;
    }
    
    try {
      const token = user.token;
      const { data } = await axiosInstance.post(`/events/feedback`, {
        eventID:event._id,
        comment: newFeedback,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbacks([...feedbacks, data.feedback]);  
      setNewFeedback('');  
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  if (loading || !event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-details-container">
      <div className="event-header">
        <h1>{event.name}</h1>
        <p>{event.description}</p>
        <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
        <p><b>Location:</b> {event.location}</p>
      </div>
      
      <div className="feedback-section">
        <h2>Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedbacks yet. Be the first to provide feedback!</p>
        ) : (
          <ul className="feedback-list">
            {feedbacks.map((feedback, index) => (
              <li key={index} className="feedback-item">
                <b>{feedback.user}</b>
                <p>{feedback.comment}</p>
              </li>
            ))}
          </ul>
        )}
        
        <div className="feedback-form">
          <textarea
            placeholder="Add your feedback..."
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
          />
          <button onClick={()=>handleFeedbackSubmit()}>Submit Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
