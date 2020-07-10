<template>
  <div>
    <div v-if="task">
      <h1>{{task.title}}</h1>
      <hr />
      <form @submit.prevent="handleSubmitForm">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
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
      this.$store.dispatch("createNewTask");
      this.$router.push("/tasks");
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
      defaultDate: new Date(),
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
  min-height: 150px;
}
</style>