<template>
  <v-snackbar
    v-model="visible"
    :color="success ? 'success' : 'error'"
    timeout="3000"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="visible = false"
        >Close</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Props passed to this component
const { message, success } = defineProps({
  message: String,
  success: Boolean,
});

// State for visibility
const visible = ref(true);
</script>
