import { ref, computed } from 'vue';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default function(torrentName) {
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

    /**
     * Used to get list of torrents that user already uploaded.
     * This is useful when user navigates to any other page and comes back.
     */
    async function listTorrent() {
        try {
            const res = await axios({
                method: 'get',
                url: '/torrent/list',
                params: {
                    uid: uid.value
                }
            });

            if (res.data && res.data.torrents) {
                torrents.value = torrents.value.concat(res.data.torrents);

                /**
                 * torrentName is passed as props when /torrent/:torrent route is visited directly
                 * or refreshed at that page.
                 */
                if (torrentName) {
                    const found = torrents.value.find(t => t.name === torrentName);

                    files.value = found.files;
                    root.value = found.name;
                }
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                store.dispatch('notifications/notify', { message: err.response.data.message, type: 'error' });
            } else {
                store.dispatch('notifications/notify', { message: 'Something Went Wrong!', type: 'error' });
            }
        }
    }

    listTorrent();

    // files in the selected torrent is stored here
    const files = ref([]);
    const root = ref('');

    /**
     * Find the selected torrent and add its files to files variable.
     *
     * @param {String} name - name of the torrent
     */
    function openTorrent(name) {
        const found = torrents.value.find(t => t.name === name);

        files.value = found.files;
        root.value = found.name;
    }

    /**
     * Change Route. Torrents are opened by changing the routes.
     *
     * @param {String} name - name of the torrent
     */
    function changeRoute(name) {
        router.push(`/torrent/${name}`);
    }

    return { torrents, addTorrent, openTorrent, files, root, changeRoute };
}
