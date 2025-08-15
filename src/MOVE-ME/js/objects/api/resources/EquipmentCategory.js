import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class EquipmentCategory extends ApiBaseObject {

    static apiCategory = ApiCategory.EquipmentCategories;

    /**
     * All equipments that fall under this category.
     * @type {ApiObjectInfo[]}
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