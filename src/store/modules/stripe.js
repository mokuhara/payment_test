const state = {
    plan: "",
};
const mutations = {
    storePlan(state, payload) {
        state.plan = payload.result;
    },
};

const actions = {
    create({
        commit,
        dispatch
    }, data) {
        dispatch(
                "http/post", {
                    url: "/api/vi/stripe/application",
                    data,
                }, {
                    root: true,
                }
            )
            .then((res) => {
                commit("storePlan", res.data);
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