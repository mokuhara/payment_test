const state = {
  specialist: {
    userId: "",
    iconUrl: "",
    name: "",
    tag: [],
    status: "",
    description: "",
    createdAt: "",
  },
};

const mutations = {
  storeSpecialistAttr(state, payload) {
    Object.keys(state.specialist).map((key) => {
      if (key === payload.type) {
        if (payload.data === null || payload.data === undefined) return;
        state.specialist[key] = payload.data;
      }
    });
  },
  create(state, payload) {
    state.specialist.iconUrl = payload.iconUrl;
    state.specialist.name = payload.name;
    state.specialist.tag = payload.tag;
    state.specialist.status = payload.status;
    state.specialist.description = payload.description;
    state.specialist.createdAt = payload.createdAt;
    state.specialist.userId = payload.userId;
  },
};

const actions = {
  get({ commit, dispatch }, data) {
    dispatch(
      "http/post",
      {
        url: "/api/v1/user",
        data,
      },
      {
        root: true,
      }
    )
      .then((res) => {
        commit("create", res.data);
      })
      .catch((err) => err);
    // .finally((res) => commit("destroy")); // eslint-disable-line
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
