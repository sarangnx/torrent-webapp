<template>
    <div class="file-explorer">
        <controls />
        <component
            v-for="file in currentFolder.children"
            :key="file.name"
            :is="file.type"
            :item="file"
            @open-folder="changeRoute"
            @download="$emit('download', $event)"
            v-long-press="{ handler: openContextMenu, args: [file] }"
            @contextmenu.prevent.stop="openContextMenu($event, file)"
            :progress="file.path === progress.path ? progress : null"
        ></component>
        <context-menu v-if="show" v-click-outside="closeContextMenu" :coords="coords" :menu="menu" />
    </div>
</template>

<script>
import { watch, ref, markRaw } from 'vue';
import useContextMenu from '@/hooks/useContextMenu';
import useFileExplorer from '@/hooks/useFileExplorer';
import Folder from './Folder';
import File from './File';
import Controls from './Controls';
import ContextMenu from './contextMenu';
import Download from './icons/Download';
import FolderOpen from './icons/FolderOpen';

export default {
    components: {
        Folder,
        File,
        Controls,
        ContextMenu
    },
    props: {
        files: Array,
        root: String,
        torrent: String,
        paths: [String, Array],
        progress: Object
    },
    setup(props, context) {
        const { tree, openFolder, currentFolder, changeRoute } = useFileExplorer(props.files, props.root, props.paths);

        // open folder when route changes
        watch(
            () => props.paths,
            paths => openFolder(paths)
        );

        const { show, coords, selectedItem, openContextMenu, closeContextMenu } = useContextMenu();
        const menu = ref([]);

        function download() {
            context.emit('download', {
                type: selectedItem.value.type,
                name: selectedItem.value.name,
                item: selectedItem.value
            });
            closeContextMenu();
        }

        // change menu items on file/folder type change
        watch(
            () => selectedItem.value.type,
            () => {
                if (selectedItem.value.type === 'folder') {
                    menu.value = [
                        {
                            text: 'Open',
                            handler: () => {
                                changeRoute(selectedItem.value.path);
                                closeContextMenu();
                            },
                            icon: markRaw(FolderOpen)
                        },
                        { text: 'Download', handler: download, icon: markRaw(Download) }
                    ];
                } else {
                    menu.value = [{ text: 'Download', handler: download, icon: markRaw(Download) }];
                }
            }
        );

        return {
            tree,
            openFolder,
            currentFolder,
            changeRoute,
            show,
            coords,
            selectedItem,
            openContextMenu,
            closeContextMenu,
            menu
        };
    }
};
</script>
