const state = {
    isOpen: false
};
const mutations = {
    changeModalStatus(state, bool) {
        state.isOpen = bool
    }
};

const actions = {};

export default {
    namespaced: true,
    mutations,
    state,
    actions,
};