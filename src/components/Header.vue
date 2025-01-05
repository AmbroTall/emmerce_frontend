<template>
  <v-app-bar app>
    <!-- Show menu icon only when drawer is toggled -->
    <v-btn icon @click="$emit('toggle-drawer')" v-if="!drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["drawer"]);
</script>
