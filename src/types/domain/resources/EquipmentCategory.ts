import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface EquipmentCategory extends BaseResource {
	/**
	 * All equipments that fall under this category.
	 */
	equipment: ResourceReference[];
}
