<template>
    <top-bar />
    <torrent-input @upload="addTorrent" :uid="uid" />
    <empty-page v-if="!torrents || !torrents.length" />
    <router-view
        v-else
        v-bind="dynProps"
        @open-torrent="changeRoute"
        @download="download"
        @delete-torrent="deleteTorrent"
        :progress="progress"
    />
</template>

<script>
import { watch } from 'vue';
import TopBar from '@/components/TopBar';
import TorrentInput from '@/components/TorrentInput';
import EmptyPage from '@/components/EmptyPage';
import useTorrent from '@/hooks/useTorrent';
import useSocket from '@/hooks/useSocket';

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
        const {
            torrents,
            addTorrent,
            openTorrent,
            files,
            root,
            changeRoute,
            download,
            uid,
            deleteTorrent
        } = useTorrent(props.torrent);

        const { progress } = useSocket();

        // open torrent when route changes
        watch(
            () => props.torrent,
            torrent => {
                if (torrent) {
                    openTorrent(props.torrent);
                }
            }
        );

        return { torrents, addTorrent, openTorrent, files, root, changeRoute, download, uid, progress, deleteTorrent };
    }
};
</script>
