const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "agent.log");

const logToFile = (msg) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${msg}\n`;

  console.log(log);
  fs.appendFileSync(logFile, log);
};

module.exports = { logToFile };
