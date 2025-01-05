<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <v-card>
      <v-card-title>
        <span v-if="action === 'create'">Create Item</span>
        <span v-if="action === 'edit'">Edit Item</span>
        <span v-if="action === 'delete'">Delete Item</span>
      </v-card-title>

      <v-card-text>
        <!-- Dynamic Form Rendering -->
        <v-form v-if="action !== 'delete'" ref="form">
          <div v-for="(field, index) in formFields" :key="index">
            <!-- Render Text Field for non-select types -->
            <v-text-field
              v-if="field.type !== 'select'"
              v-model="formData[field.name]"
              :label="field.label"
              :type="field.type"
              :required="true"
            />
            <!-- Render Select Field for 'select' types -->
            <v-select
              v-if="field.type === 'select'"
              v-model="formData[field.name]"
              :label="field.label"
              :items="field.choices"
              :required="true"
            />
          </div>
        </v-form>

        <!-- Delete confirmation -->
        <v-alert v-if="action === 'delete'" type="error">
          Are you sure you want to delete this item?
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn
          v-if="action !== 'delete'"
          color="primary"
          @click.prevent="submitForm"
          >Save</v-btn
        >
        <v-btn
          color="error"
          v-if="action === 'delete'"
          @click.prevent="deleteItem"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
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

// Ensure form fields are set correctly when the component is mounted
onMounted(() => {
  setFormFields();
});

// Set form fields based on the route segment
const setFormFields = () => {
  console.log("Current route segment:", lastSegment.value); // Debug log

  // Define form fields based on the URL segment
  if (lastSegment.value === "leads") {
    formFields.value = [
      { name: "name", label: "Lead Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "tel" },
      {
        name: "status",
        label: "Status",
        type: "select",
        choices: ["new", "contacted", "qualified", "lost"],
      },
    ];
  } else if (lastSegment.value === "contacts") {
    formFields.value = [
      { name: "first_name", label: "First Name", type: "text" },
      { name: "last_name", label: "Last Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone", type: "tel" },
    ];
  } else {
    formFields.value = [];
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
</script>

<style scoped>
.headline {
  font-size: 20px;
  font-weight: bold;
}
</style>
