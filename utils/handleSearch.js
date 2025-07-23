// utils/handleSearch.js

const sendMessage = require("./sendMessage");
const puppeteer = require("puppeteer");

async function handleSearch(query, from) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to Zomato search results for the query near Noida Sector 45
    const zomatoUrl = `https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(query)}`;
    await page.goto(zomatoUrl, { waitUntil: "networkidle2" });

    // Wait for restaurants to load
    await page.waitForSelector(".sc-beySbM.hVjKrc", { timeout: 10000 });

    // Extract top 3 restaurant names & links
    const results = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".sc-beySbM.hVjKrc"));
      return cards.slice(0, 3).map(card => {
        const name = card.querySelector("h4")?.innerText || "Unnamed";
        const link = card.querySelector("a")?.href || "";
        return { name, link };
      });
    });

    await browser.close();

    if (!results.length) {
      await sendMessage(from, "❌ Sorry, couldn't find any places matching your request.");
      return;
    }

    const reply = `🍽️ Top options for *${query}* near you:\n\n` +
      results.map((r, i) => `*${i + 1}. ${r.name}*\n${r.link}`).join("\n\n");

    await sendMessage(from, reply);
  } catch (error) {
    console.error("🔴 Error in handleSearch:", error);
    await sendMessage(from, "⚠️ Oops! Something went wrong while searching Zomato.");
  }
}

module.exports = handleSearch;
