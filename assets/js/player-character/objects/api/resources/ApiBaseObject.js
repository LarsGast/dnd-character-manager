import { getApiResultsAsync } from "../../../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { ResourceList } from "../helpers/ResourceList.js";
import { globals } from "../../../load-globals.js";

export class ApiBaseObject extends ApiObjectInfo {

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
    
    /**
     * Get a single resource from the 5e SRD API or homebrew storage.
     * @template {new (...args: any) => ApiBaseObject} C
     * @this {C}
     * @param {string} index Index as specified in the API.
     * @returns {Promise<InstanceType<C>>} An instance of the specific subclass.
     */
    static async getAsync(index) {

        // Homebrew ID's are UUID's, so we know these don't exist in the API.
        const homebrewObject = globals.homebrewBank.getHomebrewObjectByIndex(index);
        if (homebrewObject) {
            return homebrewObject;
        }

        return new this(await getApiResultsAsync(this.apiCategory, index));
    }

    /**
     * Get all resources from the 5e SRD API or homebrew storage.
     * @returns {Promise<ApiBaseObjectList>}
     */
    static async getAllAsync() {

        const homebrewObjects = globals.homebrewBank.getHomebrewObjectsByCategory(this.apiCategory);

        /** @type {ResourceList} */
        const srdObjects = await getApiResultsAsync(this.apiCategory);

        return new ApiBaseObjectList(srdObjects.results, homebrewObjects)
    }
}

/**
 * Class that holds a list of ApiBaseObject instances.
 * It contains both SRD objects and homebrew objects.
 */
export class ApiBaseObjectList {

    /**
     * Array of SRD objects of the category.
     * @type {ApiBaseObject[]}
     */
    srdObjects = [];

    /**
     * Array of homebrew objects of the category.
     * @type {ApiBaseObject[]}
     */
    homebrewObjects = [];

    /**
     * Constructor.
     * Initializes the lists with provided SRD and homebrew objects.
     * @param {ApiObjectInfo[]} srdObjects Array of SRD objects.
     * @param {ApiObjectInfo[]} homebrewObjects Array of homebrew objects.
     */
    constructor(srdObjects = [], homebrewObjects = []) {
        this.srdObjects = srdObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
        this.homebrewObjects = homebrewObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
    }
}