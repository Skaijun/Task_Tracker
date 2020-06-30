<template>
  <div id="app">
    <navbar-app></navbar-app>

    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "task_tracker-app",
  components: {
    navbarApp: Navbar
  }
};
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
</style>
