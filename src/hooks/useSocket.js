import { ref } from 'vue';
import socket from '@/plugins/socket';

export default function() {
    const progress = ref({ bytesRead: 0 });

    socket.on('progress', data => {
        progress.value = data;
    });

    return { progress };
}
