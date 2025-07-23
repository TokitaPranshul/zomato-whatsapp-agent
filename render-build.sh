#!/bin/bash

# Render deploy script
npm install

# You can add playwright install if needed for Chromium:
npx playwright install chromium

# You could also add export lines if environment vars needed
# export INSTANCE_ID=...
# export WHATSAPP_TOKEN=...

node index.js
