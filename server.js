const express = require("express");
const bodyParser = require("body-parser");
const webhookRoutes = require("./routes/webhook");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/webhook", webhookRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
