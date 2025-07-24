const axios = require("axios");

const instanceId = "instance134485";
const token = "6kwhw3348pb4xfjj";

async function sendMessage(to, message) {
  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;
  const payload = {
    token,
    to,
    body: message,
    priority: 10,
  };

  console.log("📤 Sending WhatsApp Message to:", to);
  console.log("📝 Message:", message);

  try {
    const res = await axios.post(url, payload);
    console.log("✅ Message Sent:", res.data);
  } catch (error) {
    console.error("❌ ERROR sending message:", error.message);
  }
}

module.exports = sendMessage;
