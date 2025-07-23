// utils/handleSearch.js
async function handleSearch(query) {
  console.log(`🧪 Mock search for: ${query}`);

  // Simulate top 3 results
  return [
    `🍕 Dominos - Pizza, Fast Food - ⭐ 4.2`,
    `🍔 Burger King - Burgers, Beverages - ⭐ 4.0`,
    `🥪 Subway - Sandwiches, Healthy Food - ⭐ 4.1`
  ];
}

module.exports = handleSearch;
