<template>
    <div class="file-explorer">
        <component
            v-for="file in currentFolder.children"
            :key="file.name"
            :is="file.type"
            :item="file"
            @open-folder="openFolder"
        ></component>
    </div>
</template>

<script>
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
        root: String
    },
    setup(props) {
        const { tree, openFolder, currentFolder } = useFileExplorer(props.files, props.root);

        return { tree, openFolder, currentFolder };
    }
};
</script>
