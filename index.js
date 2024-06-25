const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const app = express();

const checkBirthdaysAndSendMessages = require('./birthday_scheduler')
// Middleware
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/members', require('./route/members'));
app.use('/api/custom-message', require('./route/customMessage'));
// Schedule the task to run every day at 12:00 AM
cron.schedule('0 0 * * *', () => {
  console.log('Running the birthday check task at 12:00 AM');
  checkBirthdaysAndSendMessages();
});

console.log('Birthday message scheduler is running...');

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
