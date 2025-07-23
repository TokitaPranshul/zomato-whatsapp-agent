// utils/searchAndRespond.js

const { sendMessage } = require('./sendMessage');

async function searchAndRespond(phoneNumber, message) {
  console.log("🔍 Processing message:", message);

  if (message.includes("pizza")) {
    const response = `🍕 Top Pizza Places Near You:
1. Dominos - ETA: 30 mins
2. Oven Story - ETA: 35 mins
3. Pizza Hut - ETA: 40 mins

Reply with 1, 2 or 3 to choose.`;

    await sendMessage(phoneNumber, response);
  } else if (["1", "2", "3"].includes(message.trim())) {
    await sendMessage(phoneNumber, `✅ Great choice! Your order for option ${message} is being processed. You'll receive updates here on WhatsApp. 🛵`);
  } else {
    await sendMessage(phoneNumber, `🤖 I can help you find food. Try texting "I want pizza" 🍕`);
  }
}

module.exports = { searchAndRespond };
