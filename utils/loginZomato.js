const { chromium } = require('playwright-chromium');

async function loginToZomato(phoneNumber) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://www.zomato.com/ncr");
    await page.click('button[data-testid="login-button"]');
    await page.waitForTimeout(1000);

    await page.click('button:has-text("Continue with Phone")');
    await page.waitForTimeout(1000);

    await page.fill('input[name="phone"]', phoneNumber);
    await page.click('button:has-text("Send One Time Password")');

    console.log("✅ OTP sent to", phoneNumber);
    await page.waitForTimeout(15000); // Give time to enter OTP manually

    const cookies = await context.cookies();
    await browser.close();

    return {
      success: true,
      cookies,
    };
  } catch (err) {
    console.error("❌ Zomato login failed:", err.message);
    await browser.close();
    return {
      success: false,
      error: err.message,
    };
  }
}

module.exports = loginToZomato;
