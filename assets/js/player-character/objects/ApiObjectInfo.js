export class ApiObjectInfo {

    /**
     * Unique identifier in the 5e SRD API.
     * @type {string}
     */
    index;

    /**
     * Display name of the object.
     * @type {string}
     */
    name;

    /**
     * Url to the object within the API.
     * @type {string}
     */
    url;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        Object.assign(this, data);
    }
}