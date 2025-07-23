// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const webhookRoute = require("./routes/webhook");

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/webhook", webhookRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
