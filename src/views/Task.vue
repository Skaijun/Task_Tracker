<template>
  <div>
    <div v-if="task">
      <h1>{{task.title}}</h1>
      <hr />
      <form @submit.prevent="handleSubmitForm">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            id="description"
            class="materialize-textarea"
            :disabled="task.status !== 'active'"
            :maxlength="descriptionMaxLength"
            v-model="description"
          ></textarea>
          <label for="textarea2">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ description.length }}/{{ descriptionMaxLength }}</span>
        </div>
        <input type="text" ref="datepicker" :disabled="task.status !== 'active'" />
        <div class="status-handler">
          <p>Change Status:</p>
          <button
            class="btn btn-small yellow"
            :style="{'color': 'black'}"
            type="button"
            v-if="task.status === 'active'"
            @click="switchTaskStatus"
          >Active</button>
          <button
            class="btn btn-small green"
            type="button"
            v-else-if="task.status ==='completed'"
            @click="switchTaskStatus"
          >Completed</button>
          <button
            class="btn btn-small"
            type="button"
            v-else-if="task.status ==='outdated'"
            disabled
          >Outdated</button>
        </div>
        <hr />
        <button v-if="task.status === 'active'" class="btn blue" type="submit">Update Task</button>
        <button class="btn red" type="button" @click="deleteTask">Delete Task</button>
        <router-link class="btn" tag="button" :to="'/tasks'">Return to the list</router-link>
      </form>
    </div>
    <p v-else>task was not found</p>
  </div>
</template>

<script>
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
export default {
  name: "task",
  data: () => ({
    description: "",
    tags: null,
    date: null
  }),
  computed: {
    task() {
      return this.$store.getters.getTaskById(this.$route.params.id);
    },
    descriptionMaxLength() {
      return this.$store.getters.getDescriptionMaxLength;
    }
  },
  methods: {
    handleSubmitForm() {
      const updTask = {
        id: this.task.id,
        title: this.task.title,
        description: this.description,
        tags: this.tags.chipsData,
        date: this.date.date,
        status: this.task.status
      };
      this.$store.dispatch("updateTask", updTask);
      this.$router.push("/tasks");
    },
    switchTaskStatus() {
      this.$store.dispatch("changeTaskStatus", this.task.id);
    },
    deleteTask() {
      const submitDeleteAction = confirm(
        "Are you sure, you wonna delete this mega-task permanently?"
      );
      if (submitDeleteAction) {
        this.$store.dispatch("deleteTask", this.task.id);
        this.$router.push("/tasks");
      }
    }
  },
  mounted() {
    this.description = this.task.description;
    this.tags = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.tags && this.tags.destroy) {
      this.tags.destroy();
    }
  }
};
</script>

<style scoped>
.chips.input-field {
  margin-bottom: 20px;
}
#description {
  height: auto;
}
textarea#description {
  height: 100px;
  white-space: wrap;
  text-overflow: ellipsis;
  overflow-y: scroll;
}
button.btn {
  margin-right: 20px;
}
.status-handler {
  display: flex;
  align-items: center;
}
.status-handler button {
  margin-left: 20px;
}
</style>