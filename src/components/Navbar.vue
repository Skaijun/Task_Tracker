<template>
  <nav class="deep-purple darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo right">Task Tracker</router-link>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <router-link to="/" tag="li" exact active-class="active">
          <a href="#">Create Task</a>
        </router-link>
        <router-link to="/tasks" tag="li" active-class="active">
          <a href="#">List of Tasks</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style scoped>
nav {
  padding: 0 5rem;
}
</style>
