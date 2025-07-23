const axios = require('axios');
require('dotenv').config();

const instanceId = process.env.INSTANCE_ID;
const token = process.env.WHATSAPP_TOKEN;

async function sendMessage(to, message) {
  try {
    const response = await axios.post(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        to,
        body: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          token,
        },
      }
    );

    console.log(`✅ Message sent to ${to}: ${message}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending message:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = sendMessage;
