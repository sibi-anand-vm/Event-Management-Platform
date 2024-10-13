import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true }
});

const eventSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  feedback: [feedbackSchema]  
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
