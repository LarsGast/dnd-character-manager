import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { ResourceList } from "./ResourceList.js";

export class ApiBaseObject extends ApiObjectInfo {

    /**
     * Enum-like value that holds the endpoints of given class.
     * Must be implemented in every class that extends ApiBaseObject.
     * @type {ApiCategory}
     */
    static apiCategory;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
    
    /**
     * Get a single resource from the 5e SRD API.
     * @template {new (...args: any) => ApiBaseObject} C
     * @this {C}
     * @param {string} index Index as specified in the API.
     * @returns {Promise<InstanceType<C>>} An instance of the specific subclass.
     */
    static async getAsync(index) {
        return new this(await getApiResultsAsync(this.apiCategory, index));
    }

    /**
     * Get all resources from the 5e SRD API.
     * @returns {Promise<ResourceList>}
     */
    static async getAllAsync() {
        return await getApiResultsAsync(this.apiCategory);
    }
}