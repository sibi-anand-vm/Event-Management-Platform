import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from '../Connector/DBConnector.js'
import eventroutes from '../Route/eventroutes.js'
import userroutes from '../Route/userroutes.js'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); 

connectDB();
app.use('/api/events', eventroutes);
app.use('/api/users', userroutes);

const PORT = process.env.PORT || 4008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
});
