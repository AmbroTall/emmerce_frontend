<template>
  <v-app dark>
    <SideBar :drawer="drawer" @toggle-drawer="toggleDrawer" />
    <v-main>
      <Header :drawer="drawer" @toggle-drawer="toggleDrawer" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";

const drawer = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
