const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { startCronJobs } = require('./cron');
// Middleware
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

startCronJobs();
// Connect to MongoDB
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/members', require('./route/members'));
app.use('/api/custom-message', require('./route/customMessage'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
