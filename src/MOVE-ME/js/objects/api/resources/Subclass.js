import { ApiCategory, getApiResultsAsync } from "../../../api.js";
import { Feature } from "../helpers/Feature.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Subclass extends ApiBaseObject {

    static apiCategory = ApiCategory.Subclasses;

    /**
     * Description of the resource.
     * @type {string[]}
     */
    desc;

    /**
     * Class that the subclass belongs to.
     * @type {ApiBaseObject}
     */
    class;

    /**
     * Lore-friendly flavor text for a classes respective subclass.
     * @type {string}
     */
    subclass_flavor;

    /**
     * Resource url that shows the subclass level progression.
     * @type {string[]}
     */
    subclass_levels;

    /**
     * Subclass specific spells.
     * @type {object[]}
     */
    spells;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get all features of the subclass at the given level.
     * @param {number} level
     * @returns {Promise<Feature[]>} 
     */
    async getFeaturesForLevelAsync(level) {
        const response = await getApiResultsAsync(ApiCategory.Subclasses, `${this.index}/levels/${level}/features`);

        return Promise.all(response.results.map(featureInfo => Feature.getAsync(featureInfo.index)));
    }
}