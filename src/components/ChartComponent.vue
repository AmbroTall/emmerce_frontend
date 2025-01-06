<!-- ChartComponent.vue -->
<template>
  <div>
    <h2>Monthly Sales</h2>
    <BarChart
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "ChartComponent",
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Sales",
            data: [150, 200, 300, 250, 400],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Sales Data",
          },
        },
      },
    };
  },
};
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
}
</style>
