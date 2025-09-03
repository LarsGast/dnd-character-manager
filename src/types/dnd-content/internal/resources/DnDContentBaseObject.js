import { getApiResultsAsync } from "../../../../services/api.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";
import { ResourceList } from "../helpers/ResourceList.js";
import { globals } from "../../../../store/load-globals.js";

export class DnDContentBaseObject extends DnDContentObjectInfo {

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
     * @template {new (...args: any) => DnDContentBaseObject} C
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
     * @type {DnDContentBaseObject[]}
     */
    srdObjects = [];

    /**
     * Array of homebrew objects of the category.
     * @type {DnDContentBaseObject[]}
     */
    homebrewObjects = [];

    /**
     * Constructor.
     * Initializes the lists with provided SRD and homebrew objects.
     * @param {DnDContentObjectInfo[]} srdObjects Array of SRD objects.
     * @param {DnDContentObjectInfo[]} homebrewObjects Array of homebrew objects.
     */
    constructor(srdObjects = [], homebrewObjects = []) {
        this.srdObjects = srdObjects.map(obj => new DnDContentObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
        this.homebrewObjects = homebrewObjects.map(obj => new DnDContentObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
    }
}