<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <v-card>
      <v-card-title>
        <span v-if="action === 'create'">Create Item</span>
        <span v-if="action === 'edit'">Edit Item</span>
        <span v-if="action === 'delete'">Delete Item</span>
      </v-card-title>

      <v-card-text>
        <v-form v-if="action !== 'delete'" ref="form">
          <v-text-field v-model="formData.name" label="Name" required />
          <v-text-field v-model="formData.status" label="Status" required />
        </v-form>
        <v-alert v-if="action === 'delete'" type="error">
          Are you sure you want to delete this item?
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm">Save</v-btn>
        <v-btn color="error" v-if="action === 'delete'" @click="deleteItem"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  action: String,
  item: Object,
});

const emit = defineEmits(["close", "submit"]);

const dialogVisible = ref(props.visible);
const formData = ref({ name: "", status: "" });

watch(
  () => props.visible,
  (newValue) => {
    dialogVisible.value = newValue;
  }
);

const close = () => {
  emit("close");
};

const submitForm = () => {
  emit("submit", formData.value);
};

const deleteItem = () => {
  emit("submit", props.item);
};
</script>
