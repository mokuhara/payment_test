const state = {};
const mutations = {
  dummy() {},
};

const actions = {
  create({ commit }, payload) {
    console.error(payload.error);
    console.error(payload.err);
    commit("dummy");
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
