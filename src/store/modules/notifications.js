export default {
    namespaced: true,
    state: () => ({
        notifications: [],
        settings: {
            type: 'info',
            timeout: 5000
        }
    }),
    mutations: {
        addNotification(state, notification) {
            if (typeof notification === 'string' || notification instanceof String) {
                notification = { message: notification };
            }
            notification.timestamp = new Date();
            notification.timestamp.setMilliseconds(
                notification.timestamp.getMilliseconds() + state.notifications.length
            );
            notification = Object.assign({}, state.settings, notification);
            state.notifications.push(notification);
        },
        removeNotification(state, timestamp) {
            const indexToDelete = state.notifications.findIndex(n => n.timestamp === timestamp);
            if (indexToDelete !== -1) {
                state.notifications.splice(indexToDelete, 1);
            }
        }
    },
    actions: {
        notify({ commit }, notification) {
            commit('addNotification', notification);
        }
    }
};
