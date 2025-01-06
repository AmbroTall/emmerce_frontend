<template>
  <div class="notes">
    <h1>Notes</h1>
    <p>Manage all notes here.</p>
  </div>
  <DataTable
    :apiUrl="'/notes/'"
    :headers="leadTableHeaders"
    :itemsPerPage="10"
    @edit="onEditLead"
    @delete="onDeleteLead"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";

const leadTableHeaders = [
  { title: "Content", value: "content" },
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
.notes {
  padding: 24px;
  color: white;
}
</style>
