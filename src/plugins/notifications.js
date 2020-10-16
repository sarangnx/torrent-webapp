export default {
    install(app) {
        // Fully configurable notification
        app.config.globalProperties.$notify = notification => {
            app.config.globalProperties.$store.dispatch('notifications/notify', notification);
        };

        // Success Notification
        app.config.globalProperties.$success = notification => {
            notification = toObject(notification, 'success');
            app.config.globalProperties.$store.dispatch('notifications/notify', notification);
        };

        // Error Notification
        app.config.globalProperties.$error = notification => {
            notification = toObject(notification, 'error');
            app.config.globalProperties.$store.dispatch('notifications/notify', notification);
        };

        // Warning Notification
        app.config.globalProperties.$warn = notification => {
            notification = toObject(notification, 'warn');
            app.config.globalProperties.$store.dispatch('notifications/notify', notification);
        };

        // Info Notification
        app.config.globalProperties.$info = notification => {
            notification = toObject(notification, 'info');
            app.config.globalProperties.$store.dispatch('notifications/notify', notification);
        };
    }
};

function toObject(notification, type) {
    if (typeof notification === 'string' || notification instanceof String) {
        notification = { message: notification };
    }
    notification = {
        ...notification,
        type
    };
    return notification;
}
