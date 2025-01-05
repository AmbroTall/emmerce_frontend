<template>
  <DataTable
    :apiUrl="'/leads/'"
    :headers="leadTableHeaders"
    :itemsPerPage="10"
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
  { title: "Actions", value: "actions", align: "start" },
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

<style scoped></style>
