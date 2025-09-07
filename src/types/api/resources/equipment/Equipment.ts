import { ApiCategory } from "../../../../services/api.js";
import { ApiBaseObject } from "../ApiBaseObject.js";
import { ApiObjectInfo } from "../ApiObjectInfo.js";

export class Equipment extends ApiBaseObject {

    static override apiCategory = ApiCategory.Equipment;

    /**
     * Flavour description of the equipment.
     */
    desc: string[];

    /**
     * Mechanical description of anything this piece of equipment can do that is not expressed in other properties.
     */
    special: string[];

    /**
     * The Equipment Category that this equipment belongs to.
     */
    equipment_category: ApiObjectInfo;

    /**
     * The cost of the piece of equipment.
     */
    cost: Cost;

    /**
     * The weight of the equipment in pounds (lbs).
     */
    weight: number;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Equipment> = {}) {
        super(data);
        
        this.desc = data.desc ?? [];
        this.special = data.special ?? [];
        this.equipment_category = data.equipment_category ? new ApiObjectInfo(data.equipment_category) : new ApiObjectInfo();
        this.cost = data.cost ? new Cost(data.cost) : new Cost();
        this.weight = data.weight ?? 0;
    }
}

/**
 * Represents the cost of an item or piece of equipment
 */
class Cost {

    /**
     * The amount of the given unit of cost.
     */
    quantity: number;

    /**
     * The unit of cost, like gp, sp, cp, etc.
     */
    unit: string;

    constructor(data: Partial<Cost> = {}) {
        this.quantity = data.quantity ?? 0;
        this.unit = data.unit ?? "gp";
    }
}