const state = {
    specialist: {
        iconUrl: "",
        name: "",
        tag: [],
        status: "",
        description: "",
        createdAt: ""
    }
}

const mutations = {
    storeSpecialistAttr(state, payload) {
        Object.keys(state.specialist).map((key) => {
            if (key === payload.type) {
                if (payload.data === null || payload.data === undefined) return;
                state.specialist[key] = payload.data;
            }
        })
    }
}

const actions = {}

export default {
    namespaced: true,
    mutations,
    state,
    actions,
}