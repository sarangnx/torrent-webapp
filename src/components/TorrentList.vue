<template>
    <div class="torrent-list">
        <torrent-item
            v-for="torrent in torrents"
            :key="torrent.infoHash"
            :name="torrent.name"
            :size="torrent.length"
            :fileCount="torrent.files.length"
            @click="openTorrent(torrent.name, $event)"
            @dblclick="openTorrent(torrent.name, $event)"
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
        openTorrent(name) {
            this.$emit('open-torrent', name);
        }
    }
};
</script>
