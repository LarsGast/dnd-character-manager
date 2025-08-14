import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Proficiency extends ApiBaseObject {

    static apiCategory = ApiCategory.Proficiencies;

    /**
     * The general category of the proficiency.
     * @type {string}
     */
    type;

    /**
     * Classes that start with this proficiency.
     * @type {ApiObjectInfo[]}
     */
    classes = [];

    /**
     * Races that start with this proficiency.
     * @type {ApiObjectInfo[]}
     */
    races = [];

    /**
     * Reference to the full description of the related resource.
     * @type {ApiObjectInfo}
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