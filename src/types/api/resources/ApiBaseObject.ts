import { ApiCategory, EquipmentCategoryIndex, getApiResultsAsync } from "../../../services/api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { ResourceList } from "../helpers/ResourceList.js";
import { globals } from "../../../store/load-globals.js";

export abstract class ApiBaseObject extends ApiObjectInfo {

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<ApiObjectInfo> = {}) {
        super(data);
    }
    
    /**
     * Get a single resource from the 5e SRD API or homebrew storage.
     * @template C
     * @this
     * @param index Index as specified in the API.
     * @returns An instance of the specific subclass.
     */
    static async getAsync<C extends ApiObjectInfo>(
        index: string | EquipmentCategoryIndex, 
        ctor: {new (data: Partial<C>): C, apiCategory: ApiCategory}
    ): Promise<C> {

        // Homebrew ID's are UUID's, so we know these don't exist in the API.
        if (typeof index === "string") {
            const homebrewObject = globals.homebrewBank.getHomebrewObjectByIndex(index);
            if (homebrewObject) {
                return homebrewObject as C;
            }
        }

        const apiData = await getApiResultsAsync(ctor.apiCategory, index);
        return new ctor(apiData);
    }

    /**
     * Get all resources from the 5e SRD API or homebrew storage.
     * @returns
     */
    static async getAllAsync(): Promise<ApiBaseObjectList> {

        const homebrewObjects = globals.homebrewBank.getHomebrewObjectsByCategory(this.apiCategory);

        /** @type {ResourceList} */
        const srdObjects: ResourceList = await getApiResultsAsync(this.apiCategory);

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
    srdObjects: ApiBaseObject[] = [];

    /**
     * Array of homebrew objects of the category.
     * @type {ApiBaseObject[]}
     */
    homebrewObjects: ApiBaseObject[] = [];

    /**
     * Constructor.
     * Initializes the lists with provided SRD and homebrew objects.
     * @param {ApiObjectInfo[]} srdObjects Array of SRD objects.
     * @param {ApiObjectInfo[]} homebrewObjects Array of homebrew objects.
     */
    constructor(srdObjects: ApiObjectInfo[] = [], homebrewObjects: ApiObjectInfo[] = []) {
        this.srdObjects = srdObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
        this.homebrewObjects = homebrewObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
    }
}