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
      pointRadius: 6,
      pointHoverRadius: 8,
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
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#06b6d4",
      pointBorderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#6b7280",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      borderColor: "#374151",
      borderWidth: 1,
      padding: 20,
      cornerRadius: 8,
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
      ticks: {
        color: "#9ca3af",
        font: {
          size: 14,
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#9ca3af",
        font: {
          size: 14,
        },
        callback: function (value) {
          return "₹" + value + "K";
        },
      },
      grid: {
        color: "#e5e7eb",
        borderDash: [4, 4],
      },
    },
  },
};

new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});
