// utils/loginZomato.js
const puppeteer = require("puppeteer");

async function loginZomato(phoneNumber) {
  const browser = await puppeteer.launch({ headless: false }); // Use true later for full automation
  const page = await browser.newPage();

  // Navigate to Zomato login
  await page.goto("https://www.zomato.com/india", { waitUntil: "networkidle2" });

  // Click Login
  await page.waitForSelector('[data-testid="login"]');
  await page.click('[data-testid="login"]');

  // Wait and enter phone number
  await page.waitForSelector('input[type="tel"]');
  await page.type('input[type="tel"]', phoneNumber);
  await page.click('[type="submit"]'); // Submit number to trigger OTP

  // At this point, OTP must be manually entered by the user
  console.log("🚨 Enter OTP manually in the browser window.");

  // Wait for login to complete manually
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  return { browser, page };
}

module.exports = loginZomato;
