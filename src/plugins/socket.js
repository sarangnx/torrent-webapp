import io from 'socket.io-client';

class SocketIO {
    constructor() {
        // connect to server
        this.socket = io(process.env.VUE_APP_API_URL, {
            transports: ['websocket', 'polling']
        });
    }

    install(app) {
        app.config.globalProperties.$io = this.socket;
    }

    /**
     * Connected Room ID
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
}

export default new SocketIO();
