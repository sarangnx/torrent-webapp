<template>
    <div class="torrent-list">
        <torrent-item
            v-for="torrent in torrents"
            :key="torrent.infoHash"
            :name="torrent.name"
            :size="torrent.length"
            :fileCount="torrent.files.length"
            @click="openTorrent(torrent.infoHash, $event)"
            @dblclick="openTorrent(torrent.infoHash, $event)"
        />
    </div>
</template>

<script>
import TorrentItem from './TorrentItem';

export default {
    components: {
        TorrentItem
    },
    props: {
        torrents: Array
    },
    methods: {
        openTorrent(infoHash) {
            this.$emit('open-torrent', infoHash);
        }
    }
};
</script>

<style lang="scss">
.torrent-list {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    row-gap: 1rem;
    margin-top: 4rem;
}
</style>
