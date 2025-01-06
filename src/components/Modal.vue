<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span v-if="action === 'create'">Create Item</span>
        <span v-if="action === 'edit'">Edit Item</span>
        <span v-if="action === 'delete'">Delete Item</span>
      </v-card-title>

      <v-card-text>
        <!-- Dynamic Form Rendering -->
        <v-form
          v-if="action !== 'delete'"
          ref="form"
        >
          <div
            v-for="(field, index) in formFields"
            :key="index"
          >
            <!-- Render Text Field for non-select types -->
            <v-text-field
              v-if="field.type !== 'select'"
              v-model="formData[field.name]"
              :label="field.label"
              :type="field.type"
              :required="true"
            />
            <v-select
              v-if="field.type === 'select'"
              v-model="formData[field.name]"
              :label="field.label"
              :items="field.choices"
              item-title="name"
              item-value="id"
              :required="true"
            />
          </div>
        </v-form>

        <!-- Delete confirmation -->
        <v-alert
          v-if="action === 'delete'"
          type="error"
        >
          Are you sure you want to delete this item?
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="action !== 'delete'"
          color="primary"
          @click.prevent="submitForm"
        >
          Save
        </v-btn>
        <v-btn
          v-if="action === 'delete'"
          color="error"
          @click.prevent="deleteItem"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axiosInstance from "@/AxiosInstance";
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  visible: Boolean,
  action: String,
  item: Object,
});

const emit = defineEmits(["close", "submit"]);

const dialogVisible = ref(props.visible);
const formData = ref({});
const formFields = ref([]);
const leads = ref([]);

const route = useRoute(); // Get route information

const lastSegment = ref(route.path.split("/").pop()); // Reactive reference for the route segment

// Watch the visibility prop to show/hide the dialog
watch(
  () => props.visible,
  (newValue) => {
    dialogVisible.value = newValue;
  }
);

// Watch the action prop to reset formData and fetch new fields when needed
watch(
  () => props.action,
  (newAction) => {
    if (newAction === "edit" && props.item) {
      formData.value = { ...props.item }; // Prefill formData for editing
    } else if (newAction === "create") {
      formData.value = {}; // Clear formData for new item
    }
    setFormFields(); // Set fields based on the action or route
  }
);

// Watch the route path to trigger field updates on URL change
watch(
  () => route.path,
  () => {
    lastSegment.value = route.path.split("/").pop(); // Update last segment reactively
    setFormFields(); // Re-trigger field setup on route change
  }
);
const fetchLeads = async () => {
  try {
    const response = await axiosInstance.get("leads/");
    // Structure leads data correctly
    leads.value = response.data.results.map((lead) => ({
      id: lead.id, // The unique identifier of the lead
      name: lead.name, // The name of the lead to display
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Ensure form fields are set correctly when the component is mounted
onMounted(() => {
  fetchLeads();
  setFormFields();
});

// Set form fields based on the route segment
const setFormFields = () => {
  // Define form fields based on the URL segment
  if (lastSegment.value === "leads") {
    formFields.value = [
      { name: "name", label: "Lead Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { label: "Company", name: "company", type: "text", required: false },
      {
        name: "status",
        label: "Status",
        type: "select",
        choices: ["new", "contacted", "qualified", "lost"],
        required: true,
      },
    ];
  } else if (lastSegment.value === "contacts") {
    formFields.value = [
      { label: "First Name", name: "first_name", type: "text", required: true },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
      { label: "Phone", name: "phone", type: "tel", required: true },
      {
        name: "lead",
        label: "Lead",
        type: "select",
        choices: leads.value,
        required: true,
      },
    ];
  } else if (lastSegment.value === "notes") {
    formFields.value = [
      { label: "Content", name: "content", type: "textarea", required: true },
      {
        name: "lead",
        type: "select",
        choices: leads.value,
        label: "Lead",
        required: true,
      },
    ];
  } else {
    formFields.value = [
      { label: "Title", name: "title", type: "text", required: true },
      {
        label: "Scheduled Time",
        name: "scheduled_time",
        type: "datetime-local",
        required: true,
      },
      {
        name: "lead",
        label: "Lead",
        type: "select",
        choices: leads.value,

        required: true,
      },
    ];
  }

  console.log("Form fields:", formFields.value); // Debug log
};

// Submit the form
const submitForm = () => {
  emit("submit", formData.value);
};

// Handle delete action
const deleteItem = () => {
  emit("submit", props.item);
};

// Close the dialog
const close = () => {
  emit("close");
};

watch(
  () => leads.value,
  () => {
    setFormFields(); // Re-set form fields when leads are fetched
  },
  { immediate: true } // Trigger immediately when component is mounted
);
</script>

<style scoped>
.headline {
  font-size: 20px;
  font-weight: bold;
}
</style>
