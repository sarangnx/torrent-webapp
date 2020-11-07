import { ref } from 'vue';
import Folder from '@/utils/Folder';
import File from '@/utils/File';
import router from '@/router';

export default function(files, root, paths) {
    // check if the torrent is just for a single file, without any folders
    // then the path or torrent and name is same
    const isSingleFileTorrent = files[0].path === root;

    const tree = ref(null);
    const currentFolder = ref(null);

    // create root folder
    tree.value = new Folder(root, root);

    if (isSingleFileTorrent) {
        // add single file to tree
        tree.value.children.push(new File(files[0]));
    } else {
        // add all the files to tree
        files.forEach(file => {
            tree.value.add(file);
        });
    }

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

    // for retaining current folder in case of reload or direct routing
    if (paths && paths.length !== 0) {
        openFolder(paths);
    }

    return { tree, openFolder, currentFolder, changeRoute };
}
