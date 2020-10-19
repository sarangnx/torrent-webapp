import File from './File';

/**
 * Used to represent Folder in torrent file.
 * All the inner nodes of the tree are made of Folder.
 */
export default class Folder {
    /**
     * Create a folder object.
     *
     * @param {String} name - Name of Folder
     * @param {String} path - Full path of Folder includingthis folder's name
     */
    constructor(name, path) {
        this.name = name;
        this.path = path;
        // files and sub-folders are stored here
        this.children = [];
    }

    get type() {
        return 'folder';
    }

    /**
     * Return Number of items in the folder.
     * Not recursive.
     */
    get count() {
        return this.children.length;
    }

    /**
     * Add a file to the tree recursively by parsing the path string
     *
     * @param {Object} file - Object with details of file
     * @param {String} file.name - Name of file
     * @param {String} file.path - Full Path of file
     * @param {String} file.length - Size of file in bytes
     */
    add(file) {
        // split path string of the file
        const pathArray = file.path.split('/');

        // Level of this folder. Starts from 1.
        const level = this.path.split('/').length;

        /**
         * if difference between level of this folder
         * and max level of incoming object (file) is 1,
         * then the file belongs in this folder,
         * otherwise it belongs to a sub folder
         */
        if (level === pathArray.length - 1) {
            this.children.push(new File(file));
            return;
        }

        /**
         * pathArray[level] is the name of the subfolder
         * Search if it already exists or not, in the list of children of this folder.
         */
        const index = this.children.findIndex(item => item.name === pathArray[level]);

        if (index !== -1) {
            // Sub folder exists. Recursively add file to the sub folder.
            this.children[index].add(file);
        } else {
            // Sub folder does not exist.
            // Create new Folder instance and add to list of children of this folder.

            // name of the sub folder
            const name = pathArray[level];
            // Full path of new folder, in case folder names repeat in the hierarchy.
            const path = `${this.path}/${name}`;

            // create new folder with name and path, and add the file to the folder.
            const folder = new Folder(name, path);
            folder.add(file);

            this.children.push(folder);
        }
    }
}
