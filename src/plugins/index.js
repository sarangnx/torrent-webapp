import directives from './directives';
import notifications from './notifications';
import socket from './socket';
import './styles';

export default {
    install(app) {
        app.use(directives);
        app.use(notifications);
        app.use(socket);

        // join room with id = user.uid
        socket.join(app.config.globalProperties.$store.state.user.uid);
    }
};
