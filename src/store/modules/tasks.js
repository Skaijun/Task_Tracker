const state = {
  tasks:
    JSON.parse(localStorage.getItem("tasks")).map((task) => {
      if (new Date(task.date) < new Date()) {
        task.status = "outdated";
      }
      return task;
    }) || [],
  descriptionMaxLength: 2048,
};

const getters = {
  getListOfTasks: (state) => state.tasks,
  getTaskById: (state) => (id) => state.tasks.find((task) => task.id === id),
  getDescriptionMaxLength: (state) => state.descriptionMaxLength,
};

const actions = {
  createNewTask({ commit }, newTask) {
    commit("setNewTask", newTask);
  },
  updateTask({ commit }, updTask) {
    commit("updTask", updTask);
  },
  changeTaskStatus({ commit }, id) {
    commit("changeTaskStatus", id);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
};

const mutations = {
  setNewTask(state, newTask) {
    state.tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  updTask(state, updTask) {
    const taskIndex = state.tasks.findIndex((task) => task.id === updTask.id);

    new Date(updTask.date) < new Date()
      ? (updTask.status = "outdated")
      : (updTask.status = "active");

    state.tasks.splice(taskIndex, 1, updTask);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  changeTaskStatus(state, id) {
    const index = state.tasks.findIndex((task) => task.id === id);
    state.tasks[index].status === "completed"
      ? (state.tasks[index].status = "active")
      : (state.tasks[index].status = "completed");

    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  deleteTask(state, id) {
    const index = state.tasks.findIndex((task) => task.id === id);
    state.tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
