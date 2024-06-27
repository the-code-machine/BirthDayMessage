const { CronJob } = require('cron');
const { Vonage } = require('@vonage/server-sdk');
const mongoose = require('mongoose');
const Member = require('./models/members'); // Adjust the path as needed
require('dotenv').config();

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

const from = "Rishus Infotech";

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function sendSMS(to, text) {
  try {
    const to_number = "91" + to;
    const response = await vonage.sms.send({ to: to_number, from, text });
    if (response.messages[0]['status'] === '0') {
      console.log('Message sent successfully to', to);
    } else {
      console.log('Failed to send message to', to, 'with error:', response.messages[0]['error-text']);
    }
  } catch (error) {
    console.log('Error sending message to', to);
    console.error(error);
  }
}

async function checkBirthdaysAndSendMessages() {
  const today = new Date();
  const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

  try {
    const members = await Member.find();

    for (const member of members) {
      const memberDob = new Date(member.dob);
      const memberMonthDay = `${memberDob.getMonth() + 1}-${memberDob.getDate()}`;

      if (memberMonthDay === todayMonthDay) {
        const text = `Happy Birthday, ${member.name}! Thank you for your generous donation.`;
        await sendSMS(member.number, text); // Ensure sendSMS is awaited
      }
    }
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function startCronJobs() {
  const cronJob = new CronJob(
    '15 9  * * *',
    checkBirthdaysAndSendMessages,
    null,
    true, // Start the job immediately
    'Asia/Kolkata' // Time zone for the job
  );

  cronJob.start();
}
module.exports = {
  startCronJobs,
};


