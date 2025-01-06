<template>
  <div class="data-table-container">
    <!-- Wrapper for the button and table -->
    <div class="d-flex justify-end mb-4">
      <v-btn
        color="primary"
        floating
        fab
        dark
        @click="openCreateModal"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="localItemsPerPage"
      :loading="loading"
      :server-items-length="totalItems"
      class="elevation-1"
      @update:page="onPageChange"
      @update:items-per-page="onItemsPerPageChange"
    >
      <template #item="{ item }">
        <tr>
          <!-- Loop through each header and create a dynamic column -->
          <td
            v-for="header in headers.slice(0, headers.length - 1)"
            :key="header.value"
            class="center-align"
          >
            {{ item[header.value] }}
          </td>
          <td>
            <v-btn
              size="30px"
              icon
              color="primary"
              @click="onEdit(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              size="30px"
              class="ml-2"
              icon
              color="error"
              @click="onDelete(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Modal component -->
    <Modal
      :leads="leads.value"
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
import Modal from "./Modal.vue";
import axiosInstance from "@/AxiosInstance";
import { useRoute } from "vue-router";

const route = useRoute(); // Get route information
const leads = ref([]);
const lastSegment = ref(route.path.split("/").pop().slice(0, -1)); // Remove the last letter

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
const modifiedData = ref({});
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
    const response = await axiosInstance.get(props.apiUrl, {
      params: {
        page: page.value,
        itemsPerPage: localItemsPerPage.value, // Use localItemsPerPage instead of prop
      },
    });
    items.value = response.data.results;
    totalItems.value = response.data.count;
    console.log("Total items:", response.data.results);
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  }
};

const modifyData = async (data, mode) => {
  console.log("Modify data:", data);
  let successMessage = "";
  let errorMessage = "";
  try {
    loading.value = true;

    let response;

    if (mode === "create") {
      response = await axiosInstance.post(props.apiUrl, data);
      modifiedData.value = response.data;
      successMessage = `${lastSegment.value} created successfully!`;
      errorMessage = `Error creating the ${lastSegment.value}.`;

      // Add new item to the items array
      items.value.push(response.data);
    } else if (mode === "edit") {
      response = await axiosInstance.put(props.apiUrl + `${data.id}/`, data);
      modifiedData.value = response.data;
      successMessage = `${lastSegment.value} updated successfully!`;
      errorMessage = `Error updating the ${lastSegment.value}.`;

      // Update the edited item in the items array
      const index = items.value.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
    } else if (mode === "delete") {
      await axiosInstance.delete(props.apiUrl + `${data.id}/`);
      successMessage = `${lastSegment.value} deleted successfully!`;
      errorMessage = `Error deleting the ${lastSegment.value}.`;

      // Remove the deleted item from the items array
      items.value = items.value.filter((item) => item.id !== data.id);
    }

    loading.value = false;

    // After the action, show the success toaster
    showToast.value = true;
    toastMessage.value = successMessage;
    toastSuccess.value = true;
  } catch (error) {
    // After the action, show the error toaster
    showToast.value = true;
    toastMessage.value = errorMessage;
    toastSuccess.value = false;
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
const fetchLeads = async () => {
  try {
    const response = await axiosInstance.get("leads/");
    leads.value = response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
  fetchLeads();
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

const handleFormSubmit = (data) => {
  console.log("Form submitted:", data);
  // Handle the form submission, like create or update an item
  if (modalAction.value === "create") {
    // Create item
    modifyData(data, "create");
  } else if (modalAction.value === "edit") {
    // Edit item
    modifyData(data, "edit");
  } else if (modalAction.value === "delete") {
    // Delete item
    modifyData(data, "delete");
  }
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
