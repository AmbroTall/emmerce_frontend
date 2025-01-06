<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <p>Manage contacts.</p>
  </div>

  <DataTable
    :apiUrl="'/contacts/'"
    :headers="contactTableHeaders"
    :itemsPerPage="10"
    @edit="onEditLead"
    @delete="onDeleteLead"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";

const contactTableHeaders = [
  { title: "First Name", value: "first_name" },
  { title: "Last Name", value: "last_name" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
  { title: "Created At", value: "created_at" },
  { title: "Actions", key: "actions" },
];

/**
 * Handle when a lead is edited.
 *
 * @param {object} lead - The lead being edited.
 */
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
