const state = {
  tenant: "",
  userId: "",
};
const mutations = {
  create(state, data) {
    state.token = data.token;
    state.userId = data.user_id;
  },
  destroy(state) {
    state.userId = "";
    state.token = "";
  },
};

const actions = {
  create({ commit, dispatch }, data) {
    dispatch(
      "http/post",
      {
        url: "/api/v1/auth",
        data,
        error: "message.unauthorized",
      },
      {
        root: true,
      }
    )
      .then((res) => commit("create", res.data))
      .catch((err) => err);
  },
  destroy({ commit, dispatch }, data) {
    dispatch(
      "http/delete",
      {
        url: "/api/v1/auth",
        data,
      },
      {
        root: true,
      }
    )
      .then((res) => commit("create", res.data))
      .catch((err) => err)
      .finally((res) => commit("destroy")); // eslint-disable-line
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
