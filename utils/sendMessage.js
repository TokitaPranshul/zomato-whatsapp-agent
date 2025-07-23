// utils/sendMessage.js

const axios = require('axios');
const instanceId = process.env.ULTRA_INSTANCE_ID;
const token = process.env.ULTRA_TOKEN;

async function sendMessage(to, message) {
  const payload = {
    to: to.includes('@c.us') ? to : `${to}@c.us`, // ensure correct format
    body: message
  };

  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  try {
    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    });
    console.log("✅ Message sent to", payload.to, ":", message);
  } catch (error) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
  }
}

module.exports = { sendMessage };
