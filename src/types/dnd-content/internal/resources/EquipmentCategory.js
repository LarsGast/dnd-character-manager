import { ApiCategory } from "../../../../services/api.js";
import { ApiBaseObject } from "../../api/resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../../api/resources/ApiObjectInfo.js";

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