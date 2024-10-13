import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  submitFeedback,
  getFeedback
} from '../Controllers/eventController.js';
import { protect, admin } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.route('/')
  .post(protect, admin, createEvent)
  .get(getEvents);
  router.post('/:id/register',protect, registerForEvent);
  router.post('/feedback', protect, submitFeedback);
  router.get('/feedback', protect,getFeedback);
router.route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

export default router;
