import { ApiCategory } from "../../../../services/api.js";
import { DnDContentBaseObject } from "./DnDContentBaseObject.js";
import { DnDContentObjectInfo } from "./DnDContentObjectInfo.js";

export class EquipmentCategory extends DnDContentBaseObject {

    static apiCategory = ApiCategory.EquipmentCategories;

    /**
     * All equipments that fall under this category.
     * @type {DnDContentObjectInfo[]}
     */
    equipment;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}