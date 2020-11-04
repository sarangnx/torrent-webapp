<template>
    <div class="torrent-list">
        <torrent-item
            v-for="torrent in torrents"
            :key="torrent.infoHash"
            :name="torrent.name"
            :size="torrent.length"
            :fileCount="torrent.files.length"
            @download="$emit('download', $event)"
            @click="openTorrent($event, torrent.name)"
            v-long-press="{ handler: openContextMenu, args: [torrent] }"
            @contextmenu.prevent.stop="openContextMenu($event, torrent)"
        />
        <context-menu v-if="show" v-click-outside="closeContextMenu" :coords="coords" :menu="menu" />
    </div>
</template>

<script>
import { ref, markRaw } from 'vue';
import useContextMenu from '@/hooks/useContextMenu';
import TorrentItem from './TorrentItem';
import ContextMenu from './contextMenu';
import Download from './icons/Download';
import FolderOpen from './icons/FolderOpen';
import Trash from './icons/Trash';

export default {
    components: {
        TorrentItem,
        ContextMenu
    },
    props: {
        torrents: Array
    },
    setup(props, context) {
        const { show, coords, selectedItem, openContextMenu, closeContextMenu } = useContextMenu();

        // download torrent
        function download() {
            context.emit('download', { type: 'torrent', name: selectedItem.value.name });
            closeContextMenu();
        }

        // open torrent.
        function openTorrent(event, name) {
            context.emit('open-torrent', name || selectedItem.value.name);
        }

        // delete torrent
        function deleteTorrent() {
            context.emit('delete-torrent', selectedItem.value.name);
            closeContextMenu();
        }

        // contextmenu items to be passed as props
        const menu = ref([]);
        menu.value = [
            { text: 'Open', handler: openTorrent, icon: markRaw(FolderOpen) },
            { text: 'Download', handler: download, icon: markRaw(Download) },
            { text: 'Delete', handler: deleteTorrent, icon: markRaw(Trash) }
        ];

        return { openContextMenu, closeContextMenu, show, coords, menu, openTorrent };
    }
};
</script>
