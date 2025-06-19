// Theme toggle functionality
const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('Icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeIcon.textContent = document.body.classList.contains('dark') ? '☀︎' : '⏾';
});

/*--------------------- Dynamic Value Updates ---------------------*/
function getRandomValue(min, max, decimals = 2) {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function updateStats() {
  document.getElementById("earnings").textContent = `₹${getRandomValue(200, 800)}`;
  document.getElementById("spend").textContent = `₹${getRandomValue(500, 900)}`;
  document.getElementById("sales").textContent = `₹${getRandomValue(300, 700)}`;
  document.getElementById("balance").textContent = `₹${getRandomValue(800, 2000, 0)}`;
  document.getElementById("tasks").textContent = `${Math.floor(Math.random() * 300)}`;
  document.getElementById("projects").textContent = `${Math.floor(Math.random() * 5000)}`;
  document.getElementById("growth").innerHTML = `+${getRandomValue(10, 30)}% <small>since last month</small>`;
}

updateStats();
setInterval(updateStats, 5000);

/*--------------------- Main Chart (Revenue & Profit) ---------------------*/
const totalSpentElement = document.querySelector('.graph-value h1');
const growthElement = document.querySelector('.graph-value p');

function formatCurrency(value) {
  return '₹' + (value * 1000).toLocaleString('en-IN');
}

function updateTotalSpent(revenueData) {
  const sum = revenueData.reduce((a, b) => a + b, 0);
  totalSpentElement.textContent = formatCurrency(sum);
  growthElement.textContent = `+${Math.floor(Math.random() * 15) + 5}% since last month`;
}

const mainChartCtx = document.getElementById("myChart").getContext("2d");
const initialRevenueData = [40, 55, 32, 66, 44, 60];
const initialProfitData = [28, 38, 24, 46, 30, 42];

const mainChart = new Chart(mainChartCtx, {
  type: "line",
  data: {
    labels: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
    datasets: [
      {
        label: "Revenue",
        data: initialRevenueData,
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: false,
        pointRadius: 0
      },
      {
        label: "Profit",
        data: initialProfitData,
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        tension: 0.4,
        fill: false,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
      intersect: false,
      
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.parsed.y}K`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { display: false }
    }
  }
});

updateTotalSpent(initialRevenueData);


setInterval(() => {
  const newRevenue = Math.floor(Math.random() * 100) + 30;
  const newProfit = Math.floor(Math.random() * 80) + 20;
  

  mainChart.data.labels.push(mainChart.data.labels.shift());
  
  
  mainChart.data.datasets[0].data.push(newRevenue);
  mainChart.data.datasets[0].data.shift();
  mainChart.data.datasets[1].data.push(newProfit);
  mainChart.data.datasets[1].data.shift();
  

  updateTotalSpent(mainChart.data.datasets[0].data);
  mainChart.update();
}, 5000);

/*--------------------- Weekly Revenue Chart ---------------------*/
const revenueCtx = document.getElementById('weeklyRevenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
  type: 'bar',
  data: {
    labels: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      {
        label: 'Product A',
        data: [120, 110, 130, 125, 115, 110, 108, 115, 120],
        backgroundColor: '#7551ff',
        borderRadius: 10,
        stack: 'combined'
      },
      {
        label: 'Product B',
        data: [100, 95, 120, 115, 105, 100, 98, 100, 105],
        backgroundColor: '#3ec1f3',
        borderRadius: 10,
        stack: 'combined'
      },
      {
        label: 'Product C',
        data: [40, 38, 50, 45, 35, 40, 39, 41, 43],
        backgroundColor: '#e0eaff',
        borderRadius: 10,
        stack: 'combined'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.parsed.y}K`
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false }
      },
      y: {
        stacked: true,
        display: false
      }
    }
  }
});

setInterval(() => {
  revenueChart.data.datasets.forEach(dataset => {
    dataset.data = dataset.data.map(
      () => Math.floor(Math.random() * (dataset.label === 'Product C' ? 30 : 50)) + 
      (dataset.label === 'Product A' ? 80 : 
       dataset.label === 'Product B' ? 70 : 30)
    );
  });
  revenueChart.update();
}, 5000);