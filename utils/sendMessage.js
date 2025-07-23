const axios = require('axios');

const instanceId = 'instance134485';
const token = '6kwhw3348pb4xfjj';
const API_URL = `https://api.ultramsg.com/${instanceId}/messages/chat`;

function formatChatId(numberOrChatId) {
  // Ensures the number is in international format and ends with @c.us
  const cleaned = numberOrChatId.replace(/\D/g, '');
  return cleaned.endsWith('@c.us') ? cleaned : `${cleaned}@c.us`;
}

async function sendMessage(to, message) {
  const chatId = formatChatId(to);

  console.log('📤 Attempting to send WhatsApp message...');
  console.log('➡️ To:', chatId);
  console.log('💬 Message:', message);

  try {
    const response = await axios.post(API_URL, {
      to: chatId,
      body: message,
      priority: 10,
    }, {
      headers: { 'Content-Type': 'application/json' },
      params: { token },
    });

    console.log('✅ UltraMsg API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to send message');
    if (error.response) {
      console.error('📄 Status:', error.response.status);
      console.error('📦 Response:', error.response.data);
    } else {
      console.error('🚨 Error:', error.message);
    }
  }
}

module.exports = sendMessage;
