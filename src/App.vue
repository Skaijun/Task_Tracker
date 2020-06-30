<template>
  <div id="app">
    <navbar-app></navbar-app>
    <div class="container">
      <router-view />
    </div>
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
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
