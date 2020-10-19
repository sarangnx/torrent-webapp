/**
 * Used to represent Files in a torrent.
 * File class is the leaf node of Folder tree.
 */
export default class File {
    /**
     * Create a file object
     *
     * @param {Object} file - Object with details of file
     * @param {String} file.name - Name of file
     * @param {String} file.path - Full Path of file
     * @param {String} file.length - Size of file in bytes
     */
    constructor(file) {
        this.name = file.name;
        this.path = file.path;
        this.length = file.length;
    }

    get type() {
        return 'file';
    }
}
