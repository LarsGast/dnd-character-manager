import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Proficiency extends ApiBaseObject {

    static override apiCategory = ApiCategory.Proficiencies;

    /**
     * The general category of the proficiency.
     */
    type: string;

    /**
     * Classes that start with this proficiency.
     */
    classes: ApiObjectInfo[]
    /**
     * Races that start with this proficiency.
     */
    races: ApiObjectInfo[];

    /**
     * Reference to the full description of the related resource.
     */
    reference: ApiObjectInfo;
    
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Proficiency> = {}) {
        super(data);
        
        this.type = data.type ?? "";
        this.classes = (data.classes ?? []).map(cls => new ApiObjectInfo(cls));
        this.races = (data.races ?? []).map(rcs => new ApiObjectInfo(rcs));
        this.reference = data.reference ? new ApiObjectInfo(data.reference) : new ApiObjectInfo();
    }
}