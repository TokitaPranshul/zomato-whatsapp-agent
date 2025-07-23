// utils/parseIntent.js
module.exports = function parseIntent(message) {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("pizza")) return "food";
  if (lowerMsg.includes("book cab") || lowerMsg.includes("taxi")) return "cab";
  if (lowerMsg.includes("buy") || lowerMsg.includes("product")) return "shopping";

  return "unknown";
};
