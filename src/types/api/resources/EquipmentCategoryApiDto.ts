import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';

export interface EquipmentCategoryApiDto extends BaseResourceApiDto {
	/**
	 * All equipments that fall under this category.
	 */
	equipment: BaseResourceApiDto[];
}
