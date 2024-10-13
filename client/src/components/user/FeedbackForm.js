import { useState } from 'react';
import axios from '../../services/api';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

const FeedbackForm = () => {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/events/${id}/feedback`, {
        user: user.username,
        comment,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setComment('');
      alert('Feedback submitted!');
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  return (
    <form onSubmit={submitFeedback}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave your feedback here"
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
