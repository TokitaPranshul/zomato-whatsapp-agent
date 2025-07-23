// utils/searchAndRespond.js

const { sendMessage } = require('./sendMessage');

async function searchAndRespond(from, message) {
  console.log("Received message:", message);

  if (message.toLowerCase().includes("pizza")) {
    const response = `🍕 Top Pizza Places Near You:
1. Dominos - ETA: 30 mins
2. Oven Story - ETA: 35 mins
3. Pizza Hut - ETA: 40 mins

Reply with 1, 2 or 3 to choose.`;

    await sendMessage(from, response);
  } else {
    await sendMessage(from, "🤖 I can help you find food. Try texting 'I want pizza' 🍕");
  }
}

module.exports = { searchAndRespond };
