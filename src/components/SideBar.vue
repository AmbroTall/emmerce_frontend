<template>
  <v-navigation-drawer
    :model-value="drawer"
    app
    @update:model-value="onDrawerUpdate"
  >
    <v-list>
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
  { title: "Leads", icon: "mdi-account", route: "/leads" },
  { title: "Contacts", icon: "mdi-account", route: "/contacts" },
  { title: "Notes", icon: "mdi-chart-bar", route: "/notes" },
  { title: "Reminders", icon: "mdi-cog", route: "/reminders" },
];
</script>
