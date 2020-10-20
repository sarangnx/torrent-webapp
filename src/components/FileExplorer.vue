<template>
    <div class="file-explorer">
        <component
            v-for="file in currentFolder.children"
            :key="file.name"
            :is="file.type"
            :item="file"
            @open-folder="changeRoute"
        ></component>
    </div>
</template>

<script>
import { watch } from 'vue';
import useFileExplorer from '@/hooks/useFileExplorer';
import Folder from './Folder';
import File from './File';

export default {
    components: {
        Folder,
        File
    },
    props: {
        files: Array,
        root: String,
        torrent: String,
        paths: [String, Array]
    },
    setup(props) {
        const { tree, openFolder, currentFolder, changeRoute } = useFileExplorer(props.files, props.root);

        // open folder when route changes
        watch([props], () => {
            if (props.paths && props.paths.length !== 0) {
                openFolder(props.paths);
            }
        });

        return { tree, openFolder, currentFolder, changeRoute };
    }
};
</script>
