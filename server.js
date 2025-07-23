// server.js
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const webhook = require("./routes/webhook");

app.use(bodyParser.json());
app.use("/webhook", webhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
