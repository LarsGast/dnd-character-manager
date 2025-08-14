import { ApiCategory } from "../../../api.js";

export class ApiObjectInfo {

    /**
     * Enum-like value that holds the endpoints of given class.
     * Must be implemented in every class that extends ApiBaseObject.
     * @type {ApiCategory}
     */
    static apiCategory;

    /**
     * Unique identifier in the 5e SRD API.
     * UUID for homebrew objects.
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

    /**
     * Creates a new instance of the object with default values.
     * This is used for creating new homebrew objects.
     * @returns {ApiObjectInfo} A new instance with default values.
     */
    static getDefault() {
        const obj = new this();

        obj.index = self.crypto.randomUUID();
        obj.name = "New Custom Object";
    
        return obj;
    }

    /**
     * Returns the API category of the object.
     * This is used to determine the type of object when creating homebrew entries.
     */
    get apiCategory() {
        return this.constructor.apiCategory;
    }

    /**
     * Returns an object that can be used as an option in a select element.
     * @returns {{optionText: string, optionValue: string}}
     */
    getOptionTextAndValueFunc() {
        return {
            optionText: this.name,
            optionValue: this.index
        };
    }
}