import { ApiCategory } from "../../../../services/api.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class Proficiency extends DnDContentBaseObject {

    static apiCategory = ApiCategory.Proficiencies;

    /**
     * The general category of the proficiency.
     * @type {string}
     */
    type;

    /**
     * Classes that start with this proficiency.
     * @type {DnDContentObjectInfo[]}
     */
    classes = [];

    /**
     * Races that start with this proficiency.
     * @type {DnDContentObjectInfo[]}
     */
    races = [];

    /**
     * Reference to the full description of the related resource.
     * @type {DnDContentObjectInfo}
     */
    reference;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}