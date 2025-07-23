const puppeteer = require('puppeteer');

async function handleSearch(query) {
  console.log(`🔍 Launching headless browser to search for: ${query}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(query)}`, {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('[data-testid="serp-restaurant-card"]');

  const results = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-testid="serp-restaurant-card"]'));
    return cards.slice(0, 3).map(card => {
      const name = card.querySelector('h4')?.innerText || 'No name';
      const cuisine = card.querySelector('[data-testid="res-cuisine-list"]')?.innerText || 'No cuisine info';
      const rating = card.querySelector('[data-testid="rating"]')?.innerText || 'No rating';
      return `${name} - ${cuisine} - ⭐ ${rating}`;
    });
  });

  await browser.close();
  console.log(`✅ Scraped top ${results.length} result(s):`, results);

  return results;
}

module.exports = handleSearch;
