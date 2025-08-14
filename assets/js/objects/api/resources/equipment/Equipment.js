import { ApiCategory } from "../../../../api.js";
import { ApiBaseObject } from "../ApiBaseObject.js";

export class Equipment extends ApiBaseObject {

    static apiCategory = ApiCategory.Equipment;

    /**
     * Flavour description of the equipment.
     * @type {string[]}
     */
    desc;

    /**
     * Mechanical description of anything this piece of equipment can do that is not expressed in other properties.
     * @type {string[]}
     */
    special;

    /**
     * The Equipment Category that this equipment belongs to. 
     * @type {ApiObjectInfo}
     */
    equipment_category;

    /**
     * The cost of the piece of equipment.
     * @type {Cost}
     */
    cost;

    /**
     * The weight of the equipment in pounds (lbs).
     * @type {number}
     */
    weight;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}

/**
 * Represents the cost of an item or piece of equipment
 */
class Cost {

    /**
     * The amount of the given unit of cost.
     * @type {number}
     */
    quantity;

    /**
     * The unit of cost, like gp, sp, cp, etc.
     * @type {string}
     */
    unit;
}