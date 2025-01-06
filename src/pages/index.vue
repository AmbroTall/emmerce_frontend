<template>
  <v-container>
    <!-- Lead Stats Card -->
    <v-row>
      <v-col v-for="(value, title) in leadStats" :key="title" cols="12" md="3">
        <v-card class="pa-3" :color="getCardColor(title)" dark>
          <v-card-title class="text-h6">
            {{ formatTitle(title) }}
          </v-card-title>
          <v-card-subtitle class="text-h4">
            {{ value }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Stats Graph -->
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-3" color="secondary" dark>
          <v-card-title class="text-h6">Contact Stats</v-card-title>
          <v-card-text>
            <BarChart :data="contactStatsChartData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- Reminder Stats Graph -->
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-3" color="accent" dark>
          <v-card-title class="text-h6">Reminder Stats</v-card-title>
          <v-card-text>
            <DoughnutChart
              :data="{
                labels: ['Sent', 'Pending'],
                datasets: [
                  { data: [10, 5], backgroundColor: ['#36A2EB', '#FF6384'] },
                ],
              }"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- Note Stats Graph -->
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-3" color="teal" dark>
          <v-card-title class="text-h6">Note Stats</v-card-title>
          <v-card-text>
            <BarChart :data="noteStatsChartData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import axiosInstance from "@/AxiosInstance";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const leadStats = ref({});
const contactStats = ref([]);
const reminderStats = ref({});
const noteStats = ref([]);

const formatTitle = (title) => {
  return title
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const getCardColor = (title) => {
  const colors = {
    total_leads: "primary",
    new_leads: "secondary",
    contacted_leads: "teal",
    qualified_leads: "purple",
    lost_leads: "red",
  };
  return colors[title] || "grey";
};

const fetchLeadStats = async () => {
  const response = await axiosInstance.get("/stats/leads/");
  leadStats.value = response.data;
};

const fetchContactStats = async () => {
  const response = await axiosInstance.get("/stats/contacts/");
  contactStats.value = response.data;
};

const fetchReminderStats = async () => {
  const response = await axiosInstance.get("/stats/reminders/");
  reminderStats.value = response.data;
};

const fetchNoteStats = async () => {
  const response = await axiosInstance.get("/stats/notes/");
  noteStats.value = response.data;
};

onMounted(() => {
  fetchLeadStats();
  fetchContactStats();
  fetchReminderStats();
  fetchNoteStats();
});

// Prepare chart data
// const contactStatsChartData = computed(() => {
//   return {
//     labels: contactStats.value.map((item) => item["lead__name"]),
//     datasets: [
//       {
//         label: "Contact Count",
//         data: contactStats.value.map((item) => item.contact_count),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };
// });

// const noteStatsChartData = computed(() => {
//   return {
//     labels: noteStats.value.map((item) => item["lead__name"]),
//     datasets: [
//       {
//         label: "Note Count",
//         data: noteStats.value.map((item) => item.note_count),
//         backgroundColor: "rgba(153, 102, 255, 0.2)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };
// });
</script>

<style scoped>
.v-container {
  padding: 2rem;
}

.v-row {
  margin-top: 20px;
}

.v-card {
  box-shadow: none;
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
}

.text-h6 {
  font-weight: 500;
}

.text-h4 {
  font-weight: 600;
}
</style>
