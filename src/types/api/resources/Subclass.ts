import { ApiCategory, getApiResultsAsync } from "../../../services/api.js";
import { Feature } from "../helpers/Feature.js";
import { ResourceList } from "../helpers/ResourceList.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Subclass extends ApiBaseObject {

    static override apiCategory = ApiCategory.Subclasses;

    /**
     * Description of the resource.
     */
    desc: string[];

    /**
     * Class that the subclass belongs to.
     */
    class: ApiObjectInfo;

    /**
     * Lore-friendly flavor text for a classes respective subclass.
     */
    subclass_flavor: string;

    /**
     * Resource url that shows the subclass level progression.
     */
    subclass_levels: string[];

    /**
     * Subclass specific spells.
     */
    spells: object[];

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Subclass> = {}) {
        super(data);
        
        this.desc = data.desc ?? [];
        this.class = data.class ? new ApiObjectInfo(data.class) : new ApiObjectInfo();
        this.subclass_flavor = data.subclass_flavor ?? "";
        this.subclass_levels = data.subclass_levels ?? [];
        this.spells = data.spells ?? [];
    }

    /**
     * Get all features of the subclass at the given level.
     * @param {number} level
     * @returns {Promise<Feature[]>} 
     */
    async getFeaturesForLevelAsync(level: number): Promise<Feature[]> {
        const response = new ResourceList(await getApiResultsAsync(ApiCategory.Subclasses, `${this.index}/levels/${level}/features`));

        return Promise.all(response.results.map(featureInfo => ApiBaseObject.getAsync(featureInfo.index, Feature)));
    }
}