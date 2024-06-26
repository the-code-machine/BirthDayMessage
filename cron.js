const { Vonage } = require('@vonage/server-sdk')

const Member = require('./models/members'); // Adjust the path as needed
require('dotenv').config();
const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret:process.env.API_SECRET 
  })

const from = "Rishus Infotech";

async function sendSMS(to, text) {
  try {
    await vonage.sms.send({ to, from, text });
    console.log('Message sent successfully to', to);
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

    members.forEach(member => {
      const memberDob = new Date(member.dob);
      const memberMonthDay = `${memberDob.getMonth() + 1}-${memberDob.getDate()}`;

      if (memberMonthDay === todayMonthDay) {
        const text = `Happy Birthday, ${member.name}! Thank you for your generous donation.`;
        sendSMS(member.number, text);
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

checkBirthdaysAndSendMessages();
