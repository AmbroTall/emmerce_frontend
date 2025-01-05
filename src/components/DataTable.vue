<template>
  <div class="data-table-container">
    <v-btn
      class="mb-4"
      color="primary"
      floating
      fab
      dark
      bottom
      left
      @click="openCreateModal"
    >
      <v-icon>mdi-plus</v-icon>
      Create
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="localItemsPerPage"
      :loading="loading"
      :server-items-length="totalItems"
      @update:page="onPageChange"
      @update:items-per-page="onItemsPerPageChange"
      class="elevation-1"
    >
      <template #item="{ item }">
        <v-btn icon color="primary" @click="onEdit(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="onDelete(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal component -->
    <Modal
      :visible="modalVisible"
      :action="modalAction"
      :item="modalItem"
      @close="closeModal"
      @submit="handleFormSubmit"
    />

    <!-- Toaster component -->
    <Toaster
      v-if="showToast"
      :message="toastMessage"
      :success="toastSuccess"
      @close="showToast = false"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import Modal from "./Modal.vue";

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
});

// const emit = defineEmits(["edit", "delete"]);

const items = ref([]);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);

// Modal visibility state
const modalVisible = ref(false);
const modalAction = ref("create"); // 'create', 'edit', or 'delete'
const modalItem = ref(null); // The item being edited or deleted

// Toast notification state
const showToast = ref(false);
const toastMessage = ref("");
const toastSuccess = ref(false);

// Create a local variable to store the itemsPerPage value
const localItemsPerPage = ref(props.itemsPerPage);

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(props.apiUrl, {
      params: {
        page: page.value,
        itemsPerPage: localItemsPerPage.value, // Use localItemsPerPage instead of prop
      },
    });
    items.value = response.data.items;
    totalItems.value = response.data.total;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  }
};

const onPageChange = (newPage) => {
  page.value = newPage;
  fetchData();
};

const onItemsPerPageChange = (newLimit) => {
  localItemsPerPage.value = newLimit; // Update the localItemsPerPage
  fetchData();
};

// const onEdit = (item) => {
//   emit("edit", item);
// };

// const onDelete = (item) => {
//   emit("delete", item);
// };

onMounted(() => {
  fetchData();
});

// Handlers for various actions
const openCreateModal = () => {
  modalAction.value = "create";
  modalItem.value = null;
  modalVisible.value = !modalVisible.value;
};

const onEdit = (item) => {
  modalAction.value = "edit";
  modalItem.value = item;
  modalVisible.value = !modalVisible.value;
};

const onDelete = (item) => {
  modalAction.value = "delete";
  modalItem.value = item;
  modalVisible.value = !modalVisible.value;
};
const closeModal = () => {
  modalVisible.value = false;
};

const handleFormSubmit = () => {
  // Handle the form submission, like create or update an item
  if (modalAction.value === "create") {
    // Create item
  } else if (modalAction.value === "edit") {
    // Edit item
  } else if (modalAction.value === "delete") {
    // Delete item
  }

  // After the action, show the success or failure toaster
  showToast.value = true;
  toastMessage.value = "Action successful!";
  toastSuccess.value = true;

  closeModal();
};

watch(() => page.value, fetchData);
watch(() => localItemsPerPage.value, fetchData); // Watch for changes in localItemsPerPage
</script>

<style scoped>
.data-table-container {
  padding: 20px;
  border-radius: 12px; /* Adds rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adds a soft shadow */
  margin: 20px auto; /* Centers the component with margin */
  max-width: 1200px; /* Limits the width */
}

.v-data-table {
  border-radius: 8px; /* Adds rounded corners to the table */
  overflow: hidden; /* Hides any overflow */
}

.v-btn {
  transition: background-color 0.3s ease-in-out;
}

.v-btn:hover {
  background-color: #42a5f5; /* Change button color on hover */
}

/* Optional: Style the DataTable header */
.v-data-table-header th {
  background-color: #f5f5f5; /* Light gray background */
  font-weight: 600;
}

/* Optional: Style the DataTable rows */
.v-data-table .v-data-table__wrapper tr {
  transition: background-color 0.3s ease;
}

.v-data-table .v-data-table__wrapper tr:hover {
  background-color: #f1f1f1; /* Light hover effect */
}
</style>
