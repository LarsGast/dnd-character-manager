import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface EquipmentCategoryApiDto extends ApiObjectInfoApiDto {

    /**
     * All equipments that fall under this category.
     */
    equipment: ApiObjectInfoApiDto[];
}