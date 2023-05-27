async function fetchDataWithAsync() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // Render table
  function renderTable(data) {
    const coinTableBody = document.getElementById("coinTableBody");
    coinTableBody.innerHTML = "";
  
    data.forEach((coin) => {
      const price = coin.current_price.toLocaleString();
      const totalVolume = "$" + coin.total_volume.toLocaleString();
      const marketCap = coin.market_cap.toLocaleString();
  
      const priceChangePercentage = coin.price_change_percentage_24h.toFixed(2);
      const priceChangeClass =
        coin.price_change_percentage_24h < 0 ? "negative" : "positive";
  
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>
            <div class="coin-name">
              <img class="coin-logo" src="${coin.image}" alt="${coin.name} Logo">
              <span>${coin.name}</span>
            </div>
          </td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${price}</td>
          <td>${totalVolume}</td>
          <td class="${priceChangeClass}">${priceChangePercentage}%</td>
          <td>$${marketCap}</td>
        `;
      coinTableBody.appendChild(row);
    });
  }
  
  // Search functionality
  function search() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const tableRows = document
      .getElementById("coinTableBody")
      .getElementsByTagName("tr");
  
    for (let i = 0; i < tableRows.length; i++) {
      const name = tableRows[i]
        .getElementsByTagName("td")[0]
        .innerText.toUpperCase();
      const symbol = tableRows[i]
        .getElementsByTagName("td")[1]
        .innerText.toUpperCase();
      if (name.includes(input) || symbol.includes(input)) {
        tableRows[i].style.display = "";
      } else {
        tableRows[i].style.display = "none";
      }
    }
  }
  
  // Sort by Market Cap
  function sortByMarketCap() {
    const table = document.getElementById("coinTable");
    const tableRows = Array.from(
      document.getElementById("coinTableBody").getElementsByTagName("tr")
    );
  
    tableRows.sort((a, b) => {
      const marketCapA = parseFloat(
        a.getElementsByTagName("td")[5].innerText.replace(/[^0-9.-]+/g, "")
      );
      const marketCapB = parseFloat(
        b.getElementsByTagName("td")[5].innerText.replace(/[^0-9.-]+/g, "")
      );
      return marketCapA - marketCapB;
    });
  
    tableRows.forEach((row) => {
      table.appendChild(row);
    });
  }
  
  // Sort by Percentage Change
  function sortByPercentageChange() {
    const table = document.getElementById("coinTable");
    const tableRows = Array.from(
      document.getElementById("coinTableBody").getElementsByTagName("tr")
    );
  
    tableRows.sort((a, b) => {
      const percentageChangeA = parseFloat(
        a.getElementsByTagName("td")[4].innerText.replace(/[^0-9.-]+/g, "")
      );
      const percentageChangeB = parseFloat(
        b.getElementsByTagName("td")[4].innerText.replace(/[^0-9.-]+/g, "")
      );
      return percentageChangeB - percentageChangeA; // Reverse the order
    });
  
    tableRows.forEach((row) => {
      table.appendChild(row);
    });
  }
  
  // Call the fetchDataWithAsync function to fetch and render data on page load
  fetchDataWithAsync();