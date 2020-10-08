const state = {
  room: "",
  rooms: [],
};
const mutations = {
  storeRoom(state, payload) {
    state.room = payload.result.join_url;
  },
  storeRooms(state, payload) {
    state.rooms = payload;
  },
};

const actions = {
  create({ commit, dispatch }, data) {
    dispatch(
      "http/post",
      {
        url: "/api/v1/createRoom",
        data,
      },
      {
        root: true,
      }
    )
      .then((res) => {
        commit("storeRoom", res.data);
      })
      .catch((err) => err);
  },
  get({ commit, dispatch }, data) {
    dispatch(
      "http/get",
      {
        url: "/api/v1/getRoom",
        data,
      },
      {
        root: true,
      }
    )
      .then((res) => {
        commit("storeRooms", res.data);
      })
      .catch((err) => err);
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
