const { v4: uuid } = require('uuid');

/**
 * @param {String} uid - Used to identify a person / device.
 */
export default {
    namespaced: true,
    state: () => ({
        uid: null
    }),
    mutations: {
        setUID(state, uid) {
            localStorage.setItem('uid', uid);
            state.uid = uid;
        }
    },
    actions: {
        init({ commit }) {
            // check for uid in localstorage
            const uid = localStorage.getItem('uid') || uuid();

            commit('setUID', uid);
        }
    }
};
