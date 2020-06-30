<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>CreateTask</h1>
      <form>
        <div class="input-field">
          <input id="first_name" type="text" class="validate" required />
          <label for="first_name">Set title to the new task</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "createTask"
};
</script>

<style>
</style>