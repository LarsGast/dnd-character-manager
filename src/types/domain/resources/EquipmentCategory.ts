import { BaseResource } from "../wrappers/BaseResource.js";

export interface EquipmentCategory extends BaseResource {

    /**
     * All equipments that fall under this category.
     */
    equipment: BaseResource[];
}