<template>
    <top-bar />
    <torrent-input @upload="addTorrent" />
    <empty-page v-if="!torrents || !(torrents && torrents.length)" />
    <torrent-list :torrents="torrents" />
</template>

<script>
import TopBar from '@/components/TopBar';
import TorrentInput from '@/components/TorrentInput';
import EmptyPage from '@/components/EmptyPage';
import TorrentList from '@/components/TorrentList';
import useTorrent from '@/hooks/useTorrent';

export default {
    components: {
        TopBar,
        TorrentInput,
        EmptyPage,
        TorrentList
    },
    setup() {
        const { torrents, addTorrent } = useTorrent();
        return { torrents, addTorrent };
    }
};
</script>
