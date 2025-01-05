<template>
  <div class="reminders">
    <h1>Reminders</h1>
    <p>Manage all reminders here.</p>
  </div>
  <DataTable
    :apiUrl="'/reminders/'"
    :headers="leadTableHeaders"
    :itemsPerPage="10"
    @edit="onEditLead"
    @delete="onDeleteLead"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";

const leadTableHeaders = [
  { title: "Name", key: "name" },
  { title: "Status", key: "status" },
  { title: "Created At", key: "created_at" },
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
