/*-------------------------------Theme toggle functionality---------------------*/
const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('Icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeIcon.textContent = document.body.classList.contains('dark') ? '◐' : '◑';
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

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let currentMonthIndex = 1; 

const initialRevenueData = [40, 55, 32, 66, 44, 60];
const initialProfitData = [28, 38, 24, 46, 30, 42];
const initialLabels = ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"];

const mainChart = new Chart(mainChartCtx, {
  type: "line",
  data: {
    labels: initialLabels,
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

  // Update month label dynamically
  currentMonthIndex = (currentMonthIndex + 1) % 12;
  const nextMonth = monthNames[currentMonthIndex];

  mainChart.data.labels.push(nextMonth);
  mainChart.data.labels.shift();

  // Update data points
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

/*--------------------- Traffic Chart ---------------------*/



function updateTrafficStats(latestValue, previousValue) {
  const trafficCountEl = document.querySelector('.traffic-count');
  const trafficSubEl = document.querySelector('.traffic-sub');
  const trafficChangeEl = document.querySelector('.traffic-change');
  
  
  trafficCountEl.textContent = latestValue.toFixed(3);
  
  
  const change = ((latestValue - previousValue) / previousValue) * 100;
  const changeFormatted = Math.abs(change).toFixed(2);
  
  
  if (change > 0) {
    trafficChangeEl.innerHTML = `▲ +${changeFormatted}%`;
    trafficChangeEl.style.color = '#4CAF50'; 
  } else if (change < 0) {
    trafficChangeEl.innerHTML = `▼ ${changeFormatted}%`;
    trafficChangeEl.style.color = '#F44336'; 
  } else {
    trafficChangeEl.innerHTML = `→ 0.00%`;
    trafficChangeEl.style.color = '#9E9E9E'; 
  }
  
}


function simulateNetworkTraffic() {
  const currentData = chart.data.datasets[0].data;
  const previousValue = currentData[currentData.length - 1] || 0;
  
  currentData.shift();
  const baseValue = 20 + Math.sin(Date.now()/10000) * 30;
  const randomFluctuation = Math.random() * 20 - 10;
  const newValue = Math.max(0, baseValue + randomFluctuation);
  currentData.push(newValue);
  
  
  updateTrafficStats(newValue, previousValue);
  
  chart.update();
  setTimeout(simulateNetworkTraffic, 2000);
}



const ctx = document.getElementById('trafficChart').getContext('2d');

function createNetworkGradient(ctx, chartArea) {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(0, 200, 255, 0.2)'); 
  gradient.addColorStop(1, 'rgba(0, 100, 255, 0.9)');   
  return gradient;
}


let trafficData = {
  labels: Array.from({length: 12}, (_, i) => i.toString().padStart(2, '0')),
  datasets: [{
    label: 'Network Traffic',
    data: Array(24).fill(0).map(() => Math.random() * 100),
    backgroundColor: function(context) {
      const chart = context.chart;
      const {ctx, chartArea} = chart;
      if (!chartArea) return 'rgba(0, 150, 255, 0.5)';
      return createNetworkGradient(ctx, chartArea);
    },
    borderRadius: { topLeft: 6, topRight: 6 },
    barThickness: 40,
    borderSkipped: false,
    borderWidth: 0
  }]
};


const chart = new Chart(ctx, {
  type: 'bar',
  data: trafficData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f1f1f',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 6,
        padding: 10,
        callbacks: {
          title: (tooltipItems) => `${tooltipItems[0].label}:00 - ${parseInt(tooltipItems[0].label)+1}:00`,
          label: (tooltipItem) => `Bandwidth: ${tooltipItem.raw.toFixed(2)} Mbps`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#a3aed0',
          font: { size: 10 },
          maxRotation: 0,
          callback: function(value, index) {
            return index % 2 === 0 ? this.getLabelForValue(value) : '';
          }
        }
      },
      y: {
        display: false,
        ticks: {
          color: '#a3aed0',
          callback: function(value) {
            return value + ' Mbps';
          }
        },
        beginAtZero: true,
        suggestedMax: 100
      }
    },
    layout: {
      padding: { 
        top: 10,
        bottom: 5 
      }
    }
  }
});


simulateNetworkTraffic();

/* For actual network monitoring:
async function fetchNetworkStats() {
  try {
    const response = await fetch('/api/network-traffic');
    const stats = await response.json();
    
    // Process your real network data here
    chart.data.datasets[0].data = stats.bandwidthUsage;
    chart.data.labels = stats.timestamps;
    chart.update();
    
    setTimeout(fetchNetworkStats, 5000); // Poll every 5 seconds
  } catch (error) {
    console.error('Network monitoring error:', error);
    setTimeout(fetchNetworkStats, 10000); // Retry after 10s
  }
}
fetchNetworkStats();
*/

  /*-------------------------------pie Chart-------------------------------*/

  const piechart = document.getElementById("pieChart").getContext("2d");

      new Chart(piechart, {
        type: "pie",
        data: {
          labels: ["Your files", "System", "Others"],
          datasets: [
            {
              data: [60, 28, 12],
              backgroundColor: ["#3a00ff", "#6ad2ff", "#f0f4ff"],
              borderWidth: 3,
              borderColor: "#ffff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1f1f1f",
              titleColor: "#fff",
              bodyColor: "#fff",
              cornerRadius: 6,
              padding: 0,
            },
          },
        },
      });

      /*------------------------------calendar------------------------------*/

      let currentDate = new Date();
        let selectedDate = new Date();

        function renderCalendar() {
            const daysContainer = document.getElementById("calendarDates");
            const monthYear = document.getElementById("monthYear");

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();

            monthYear.textContent = `${currentDate.toLocaleString("default", {
                month: "long",
            })} ${year}`;

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const prevLastDay = new Date(year, month, 0).getDate();
            const startDayIndex = (firstDay.getDay() + 6) % 7; 
            daysContainer.innerHTML = "";

            
            for (let i = startDayIndex - 1; i >= 0; i--) {
                const dayDiv = document.createElement("div");
                dayDiv.textContent = prevLastDay - i;
                dayDiv.classList.add("other-month");
                daysContainer.appendChild(dayDiv);
            }

            
            for (let d = 1; d <= lastDay.getDate(); d++) {
                const dayDiv = document.createElement("div");
                dayDiv.textContent = d;
                
                
                if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayDiv.classList.add("today");
                }
                
                
                if (d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                    dayDiv.classList.add("active");
                }
                
                dayDiv.addEventListener("click", () => {
                    selectedDate = new Date(year, month, d);
                    renderCalendar();
                });
                
                daysContainer.appendChild(dayDiv);
            }

            const totalCells = startDayIndex + lastDay.getDate();
            const nextDays = 7 - (totalCells % 7);
            if (nextDays < 7) {
                for (let d = 1; d <= nextDays; d++) {
                    const dayDiv = document.createElement("div");
                    dayDiv.textContent = d;
                    dayDiv.classList.add("other-month");
                    daysContainer.appendChild(dayDiv);
                }
            }
        }

        function changeMonth(delta) {
            currentDate.setMonth(currentDate.getMonth() + delta);
            renderCalendar();
        }

        
        renderCalendar();

        setInterval(() => {
            const now = new Date();
            if (now.getDate() !== currentDate.getDate() || 
                now.getMonth() !== currentDate.getMonth()) {
                renderCalendar();
            }
        }, 60000);