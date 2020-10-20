<template>
    <top-bar />
    <torrent-input @upload="addTorrent" />
    <empty-page v-if="!torrents || !torrents.length" />
    <router-view v-else v-bind="dynProps" @open-torrent="changeRoute" />
</template>

<script>
import { watch } from 'vue';
import TopBar from '@/components/TopBar';
import TorrentInput from '@/components/TorrentInput';
import EmptyPage from '@/components/EmptyPage';
import useTorrent from '@/hooks/useTorrent';

export default {
    components: {
        TopBar,
        TorrentInput,
        EmptyPage
    },
    props: {
        torrent: String,
        paths: [String, Array]
    },
    computed: {
        dynProps() {
            if (this.$route.params && !this.$route.params.torrent) {
                return { torrents: this.torrents };
            }

            return { files: this.files, root: this.root };
        }
    },
    setup(props) {
        const { torrents, addTorrent, openTorrent, files, root, changeRoute } = useTorrent(props.torrent);

        // open torrent when route changes
        watch([props], () => {
            if (props.torrent) {
                openTorrent(props.torrent);
            }
        });

        return { torrents, addTorrent, openTorrent, files, root, changeRoute };
    }
};
</script>
