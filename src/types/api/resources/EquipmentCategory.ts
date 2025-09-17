import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface EquipmentCategory extends ApiObjectInfo {

    /**
     * All equipments that fall under this category.
     */
    equipment: ApiObjectInfo[];
}