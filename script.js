const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('Icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Toggle emoji icon
  if (document.body.classList.contains('dark')) {
    themeIcon.textContent = '☀︎';
  } else {
    themeIcon.textContent = '⏾';
  }
});

/*--------------------------------updating values----------------------------------*/

function getRandomValue(min, max, decimals = 2) {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function updateStats() {
  document.getElementById("earnings").textContent = `$${getRandomValue(200, 800)}`;
  document.getElementById("spend").textContent = `$${getRandomValue(500, 900)}`;
  document.getElementById("sales").textContent = `$${getRandomValue(300, 700)}`;
  document.getElementById("balance").textContent = `$${getRandomValue(800, 2000, 0)}`;
  document.getElementById("tasks").textContent = `${Math.floor(Math.random() * 300)}`;
  document.getElementById("projects").textContent = `${Math.floor(Math.random() * 5000)}`;
  document.getElementById("growth").innerHTML = 
    `+${getRandomValue(10, 30)}% <small>since last month</small>`;
}

updateStats();
setInterval(updateStats, 5000);

/*--------------------graph-----------------*/


const ctx = document.getElementById("myChart").getContext("2d");

const data = {
  labels: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
  datasets: [
    {
      label: "Revenue",
      data: [40, 55, 32, 66, 44, 60],
      borderColor: "#6366F1",
      backgroundColor: "#6366F1",
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#6366F1",
      pointBorderWidth: 2,
    },
    {
      label: "Profit",
      data: [28, 38, 24, 46, 30, 42],
      borderColor: "#06b6d4",
      backgroundColor: "#06b6d4",
      tension: 0.4,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#06b6d4",
      pointBorderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  animation: {
    tension: {
      duration: 1000,
      easing: 'easeInOutQuart',
      from: 0.4,
      to: 0.4,
      loop: false,
    },
    x: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    y: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      borderColor: "#374151",
      borderWidth: 1,
      padding: 20,
      cornerRadius: 20,
      titleFont: {
        size: 20,
        weight: "bold",
      },
      bodyFont: {
        size: 14,
      },
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ₹${context.parsed.y}K`;
        },
      },
    },
  },
  hover: {
    mode: "nearest",
    intersect: true,
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: true,
        color: "#888",
        font: {
          size: 12,
        },
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});

// Simulate live data update every 3 seconds
setInterval(() => {
  // Generate new random values
  const newRevenue = Math.floor(Math.random() * 100) + 30;
  const newProfit = Math.floor(Math.random() * 80) + 20;

  // Push new data
  data.labels.push("MAR"); // Example new label - you can generate dynamically or keep static
  data.labels.shift(); // Remove oldest label to keep label count constant

  data.datasets[0].data.push(newRevenue);
  data.datasets[0].data.shift();

  data.datasets[1].data.push(newProfit);
  data.datasets[1].data.shift();

  // Update the chart to reflect changes
  myChart.update();
}, 3000);
