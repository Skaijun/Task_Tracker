<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>CreateTask</h1>
      <form @submit.prevent="handleSubmitForm">
        <div class="input-field">
          <input class="validate" id="first_name" type="text" required v-model="title" />
          <label for="first_name">Set title to the new task</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            id="description"
            class="materialize-textarea"
            :maxlength="descriptionMaxLength"
            v-model="description"
          ></textarea>
          <label for="textarea2">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ description.length }}/{{ descriptionMaxLength }}</span>
        </div>
        <input type="text" ref="datepicker" />

        <button class="btn" type="submit">Create Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "createTask",
  data: () => ({
    title: "",
    description: "",
    tags: null,
    date: null
  }),
  computed: {
    descriptionMaxLength() {
      return this.$store.getters.getDescriptionMaxLength;
    }
  },
  methods: {
    handleSubmitForm() {
      const newTask = {
        id: uuidv4(),
        date: this.date.date,
        title: this.title,
        description: this.description,
        tags: this.tags.chipsData,
        status: "active"
      };
      this.$store.dispatch("createNewTask", newTask);
      this.$router.push("/tasks");
    }
  },
  mounted() {
    this.tags = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags"
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true
    });
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
</style>