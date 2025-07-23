// utils/handleSearch.js

const sendMessage = require("./sendMessage");

async function handleSearch(message, from) {
  // 🔍 Basic keyword match to simulate food search
  if (message.toLowerCase().includes("pizza")) {
    await sendMessage(
      from,
      `🍕 I found 3 great Pizza options near you:\n\n1. Domino's\n2. La Pino'z\n3. Oven Story\n\nReply with the number to order!`
    );
  } else if (message.toLowerCase().includes("burger")) {
    await sendMessage(
      from,
      `🍔 Here are top Burger places nearby:\n\n1. Burger King\n2. Wat-a-Burger\n3. McDonald's\n\nReply with the number to order!`
    );
  } else {
    await sendMessage(
      from,
      `🤖 I can help you find food. Try texting "I want pizza" 🍕 or "I want burger" 🍔`
    );
  }
}

module.exports = handleSearch;
