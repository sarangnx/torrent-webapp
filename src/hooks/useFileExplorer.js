import { ref } from 'vue';
import Folder from '@/utils/Folder';
import router from '@/router';

export default function(files, root) {
    const tree = ref(null);
    const currentFolder = ref(null);

    // create root folder
    tree.value = new Folder(root, root);

    // add all the files to tree
    files.forEach(file => {
        tree.value.add(file);
    });

    // tree is initial value of currentFolder
    currentFolder.value = tree.value;

    /**
     * Open a folder. Get contents of a folder using path.
     * Contents are then added to currentFolder
     *
     * @param {Array} path - Path excluding the torrent name.
     */
    function openFolder(path) {
        if (!path || !path.length) {
            // reset to initial value
            currentFolder.value = tree.value;
            return;
        }
        currentFolder.value = tree.value.getContents(path);
    }

    /**
     * Change Route. Folders are opened by changing the routes.
     *
     * @param {String} path - folder path including the torrent name
     */
    function changeRoute(path) {
        router.push(`/torrent/${path}`);
    }

    return { tree, openFolder, currentFolder, changeRoute };
}
