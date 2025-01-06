<template>
  <div class="leads">
    <h1>Leads</h1>
    <p>Manage all leads here.</p>
  </div>
  <DataTable
    :api-url="'/leads/'"
    :headers="leadTableHeaders"
    :items-per-page="10"
    @edit="onEditLead"
    @delete="onDeleteLead"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";

const leadTableHeaders = [
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
  { title: "Created At", value: "created_at" },
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
.leads {
  padding: 24px;
  color: white;
}
</style>
