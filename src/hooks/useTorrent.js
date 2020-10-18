import { ref, computed } from 'vue';
import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default function() {
    // Returned torrent metadata is stored here
    const torrents = ref([]);
    const uid = computed(() => store.state.user.uid);

    /**
     * upload torrent file / Magnet URI / Link to server
     * and get parsed metadata back which is stored in torrents.
     *
     * @param {String|File} torrent - Torrent File / Magnet URI / Link to torrent
     */
    async function addTorrent(torrent) {
        const data = {
            uid: uid.value,
            torrent
        };

        // Wrap it as FormData.
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        try {
            const res = await axios({
                method: 'post',
                url: '/torrent/add',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            });

            if (res.data && res.data.metadata) {
                torrents.value.push(res.data.metadata);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                store.dispatch('notifications/notify', { message: err.response.data.message, type: 'error' });
            } else {
                store.dispatch('notifications/notify', { message: 'Something Went Wrong!', type: 'error' });
            }
        }
    }

    return { torrents, addTorrent };
}
