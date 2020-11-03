import io from 'socket.io-client';
import store from '@/store';

class SocketIO {
    constructor() {
        // connect to server
        this.socket = io(process.env.VUE_APP_API_URL, {
            transports: ['websocket', 'polling']
        });

        this.init();
    }

    // use this module as vue.js plugin
    install(app) {
        app.config.globalProperties.$io = this.socket;
    }

    init() {
        this.socket.on('reconnect', () => {
            // rejoin the room on reconnect
            if (this.roomId) {
                this.join(this.roomId);
            }
        });

        this.socket.on('message', data => {
            store.dispatch('notifications/notify', {
                message: data.message,
                type: data.type
            });
        });
    }

    /**
     * Connected Room ID.
     */
    roomId = null;

    /**
     * Join a room, with room ID
     *
     * @param {String} id - Room ID
     */
    join(id) {
        this.roomId = id;
        this.socket.emit('join:room', id);
    }

    /**
     * Listen to socket events
     *
     * @param {String} event - Event Name
     * @param {Function} callback - Function to call on event
     */
    on(event, callback) {
        this.socket.on(event, callback);
    }
}

export default new SocketIO();
