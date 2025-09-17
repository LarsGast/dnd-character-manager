import { ApiCategory, EquipmentCategoryIndex, getApiResultsAsync } from "../../../services/api.js";
import { ApiObjectInfoApiDto } from "./ApiObjectInfoApiDto.js";
import { ResourceList } from "../helpers/ResourceList.js";
import { globals } from "../../../store/load-globals.js";

export abstract class ApiBaseObject extends ApiObjectInfoApiDto {

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
     * @param {ApiObjectInfoApiDto[]} srdObjects Array of SRD objects.
     * @param {ApiObjectInfoApiDto[]} homebrewObjects Array of homebrew objects.
     */
    constructor(srdObjects: ApiObjectInfoApiDto[] = [], homebrewObjects: ApiObjectInfoApiDto[] = []) {
        this.srdObjects = srdObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
        this.homebrewObjects = homebrewObjects.map(obj => new ApiObjectInfo(obj)).sort((a, b) => a.name.localeCompare(b.name));
    }
}