<template>
  <div>
    <h1>List of Tasks</h1>
    <div class="row" v-if="tasks.length">
      <div class="input-field col s6">
        <select ref="select" v-model="selectedTaskStatus">
          <option value disabled selected>Choose task status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="outdated">Outdated</option>
        </select>
        <label>Task status filter</label>
        <button
          class="btn btn-small red"
          v-if="selectedTaskStatus"
          @click="resetStatusFilter"
        >Show All Tasks</button>
      </div>
    </div>
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
        <tr v-for="(task, index) of filteredTasks" :key="task.id">
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
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
export default {
  name: "tasks",
  data: () => ({
    selectedTaskStatus: null,
    filterForStatus: null
  }),
  methods: {
    resetStatusFilter() {
      this.selectedTaskStatus = null;
      this.filterForStatus.destroy();
      setTimeout(() => {
        this.filterForStatus = M.FormSelect.init(this.$refs.select);
      }, 1);
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.getListOfTasks;
    },
    filteredTasks() {
      return this.tasks.filter(task => {
        if (!this.selectedTaskStatus) {
          return true;
        } else {
          return task.status === this.selectedTaskStatus;
        }
      });
    }
  },
  mounted() {
    this.filterForStatus = M.FormSelect.init(this.$refs.select);
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