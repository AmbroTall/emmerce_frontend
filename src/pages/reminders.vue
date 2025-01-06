<template>
  <div class="reminders">
    <h1>Reminders</h1>
    <p>Manage all reminders here.</p>
  </div>
  <DataTable
    :api-url="'/reminders/'"
    :headers="leadTableHeaders"
    :items-per-page="10"
    @edit="onEditLead"
    @delete="onDeleteLead"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";

const leadTableHeaders = [
  { title: "Title", value: "title" },
  { title: "Scheduled Time", value: "scheduled_time" },
  { title: "Is Sent", value: "is_sent" },
  { title: "Actions", key: "actions" },
];

const onEditLead = (lead) => {
  // Handle edit
  console.log("Edit lead:", lead);
};

const onDeleteLead = (lead) => {
  // Handle delete
  console.log("Delete lead:", lead);
};
</script>

<style scoped>
.reminders {
  padding: 24px;
  color: white;
}
</style>
