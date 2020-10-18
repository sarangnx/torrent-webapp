<template>
    <div class="torrent-list">
        <torrent-item
            v-for="torrent in torrents"
            :key="torrent.infoHash"
            :name="torrent.name"
            :size="torrent.length"
            :fileCount="torrent.files.length"
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
