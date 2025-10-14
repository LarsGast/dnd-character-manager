import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface EquipmentCategoryApiDto extends BaseResourceApiDto {
	/**
	 * All equipments that fall under this category.
	 */
	equipment: ResourceReferenceApiDto[];
}
