const express = require("express");
const bodyParser = require("body-parser");
const webhookRoute = require("./routes/webhook");
const app = express();

app.use(bodyParser.json());
app.use("/webhook", webhookRoute);

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
