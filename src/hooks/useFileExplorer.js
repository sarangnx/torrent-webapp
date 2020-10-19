import { ref } from 'vue';
import File from '@/utils/File';
import Folder from '@/utils/Folder';

export default function(files, root) {
    const tree = ref(null);

    // create root folder
    tree.value = new Folder(root, root);

    // add all the files to tree
    files.forEach(file => {
        tree.value.add(file);
    });

    return { tree, File, Folder };
}
