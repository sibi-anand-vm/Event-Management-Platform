import Event from '../Models/Event.js';
export const createEvent = async (req, res) => {
  const { name, date, description, location } = req.body;
  try {
    const event = new Event({ name, date, description, location });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { name, date, description, location } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.name = name || event.name;
      event.date = date || event.date;
      event.description = description || event.description;
      event.location = location || event.location;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event) {
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const userId = req.user._id; 
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }
    event.registrations.push(userId);
    await event.save();
    res.status(200).json({ message: 'User registered for the event successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const submitFeedback = async (req, res) => {
  try {
    const { eventID,comment } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const event = await Event.findById(eventID); 

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const feedback = {
      user: req.user.username, 
      comment: comment.trim(),
    };

    event.feedback.push(feedback); 
    await event.save();

    res.status(200).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const {eventID}=req.body;
    const event = await Event.findById(eventID)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event.feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


