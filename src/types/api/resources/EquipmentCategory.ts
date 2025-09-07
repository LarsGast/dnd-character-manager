import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class EquipmentCategory extends ApiBaseObject {

    static override apiCategory = ApiCategory.EquipmentCategories;

    /**
     * All equipments that fall under this category.
     */
    equipment: ApiObjectInfo[];

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<EquipmentCategory> = {}) {
        super(data);

        this.equipment = (data.equipment ?? []).map(equipment => new ApiObjectInfo(equipment));
    }
}