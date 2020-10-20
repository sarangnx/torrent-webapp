<template>
    <top-bar />
    <torrent-input @upload="addTorrent" />
    <empty-page v-if="!torrents || !torrents.length" />
    <router-view v-else v-bind="dynProps" @open-torrent="openTorrent" />
</template>

<script>
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
        torrent: String
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
        const { torrents, addTorrent, openTorrent, files, root } = useTorrent(props.torrent);

        return { torrents, addTorrent, openTorrent, files, root };
    }
};
</script>
