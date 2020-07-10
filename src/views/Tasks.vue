<template>
  <div>
    <h1>List of Tasks</h1>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) of tasks" :key="task.id">
          <td>{{index + 1}}</td>
          <td>{{task.title}}</td>
          <td>{{ new Date(task.date).toLocaleDateString()}}</td>
          <td class="description-col">
            <div class="description-text">{{task.description}}</div>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link class="btn btn-small" tag="button" :to="'/task/' + task.id">Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  name: "tasks",
  data: () => ({}),
  computed: {
    tasks() {
      return this.$store.getters.getListOfTasks;
    }
  }
};
</script>

<style scoped>
.description-col {
  max-width: 400px;
}
.description-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>