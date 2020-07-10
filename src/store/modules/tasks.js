const state = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
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
};

const mutations = {
  setNewTask(state, newTask) {
    state.tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
