<template>
  <v-navigation-drawer
    :model-value="drawer"
    app
    @update:model-value="onDrawerUpdate"
  >
    <!-- Close Button -->
    <v-btn icon @click="$emit('toggle-drawer')" class="close-btn">
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-list>
      <v-list-item class="mt-10">
        <!-- Mini CRM Title with custom font size and color -->
        <v-list-item-title class="title-text"> Mini CRM </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="link in links"
        :key="link.title"
        :to="link.route"
        link
      >
        <div class="d-flex">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-3">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["drawer"]);
const emit = defineEmits(["update:drawer"]);

const onDrawerUpdate = (value) => {
  emit("update:drawer", value);
};
const links = [
  { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
  { title: "Leads", icon: "mdi-account-group", route: "/leads" },
  { title: "Contacts", icon: "mdi-phone", route: "/contacts" },
  { title: "Notes", icon: "mdi-note", route: "/notes" },
  { title: "Reminders", icon: "mdi-bell", route: "/reminders" },
];
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000; /* Ensure the button is on top */
}
.title-text {
  font-size: 2rem; /* Increase the font size */
  color: #03a9f4; /* Light blue color */
}
</style>
