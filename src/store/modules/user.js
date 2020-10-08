const state = {
    specialist: {
        userId: "",
        iconUrl: "",
        iconName: "",
        name: "",
        tags: [],
        status: "",
        description: "",
        createdAt: "",
    },
    specialists: []
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
        state.specialist.iconName = payload.iconName;
        state.specialist.name = payload.name;
        state.specialist.tags = payload.tags;
        state.specialist.status = payload.status;
        state.specialist.description = payload.description;
        state.specialist.createdAt = payload.createdAt;
        state.specialist.userId = payload.userId;
    },
    storeSpecialists(state, payload) {
        state.specialists = payload.result
    }
};

const actions = {
    get({
        commit,
        dispatch
    }, data) {
        console.log('start')
        dispatch(
                "http/get", {
                    url: "/api/v1/user",
                    data,
                }, {
                    root: true,
                }
            )
            .then((res) => {
                commit("storeSpecialists", res.data);
            })
            .catch((err) => err);
        // .finally((res) => commit("destroy")); // eslint-disable-line
    },
    uploadImage({
        commit,
        dispatch
    }, data) {
        dispatch(
                "http/post", {
                    url: "/api/v1/fileUpload",
                    data,
                }, {
                    root: true,
                }
            )
            .then((res) => {
                commit("storeSpecialistAttr", {
                    type: "iconUrl",
                    data: res.data.url,
                });
                commit("storeSpecialistAttr", {
                    type: "iconName",
                    data: res.data.name,
                });
            })
            .catch((err) => err);
    },
    update({
        dispatch,
        commit,
        state
    }) {
        const data = {
            filter: {
                userId: state.specialist.userId
            },
            update: {
                iconUrl: state.specialist.iconUrl,
                iconName: state.specialist.iconName,
                name: state.specialist.name,
                tags: state.specialist.tags,
                status: state.specialist.status,
                description: state.specialist.description,
                userId: state.specialist.userId,
            },
        };
        dispatch(
                "http/patch", {
                    url: "/api/v1/user",
                    data,
                }, {
                    root: true,
                }
            )
            .then((res) => {
                commit("storeSpecialistAttr", {
                    type: "iconUrl",
                    data: res.data.url,
                });
                commit("storeSpecialistAttr", {
                    type: "iconName",
                    data: res.data.name,
                });
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