<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <p>Manage contacts.</p>
  </div>

  <DataTable
    :apiUrl="'/contacts/'"
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
.contacts {
  padding: 24px;
  color: white;
}
</style>
