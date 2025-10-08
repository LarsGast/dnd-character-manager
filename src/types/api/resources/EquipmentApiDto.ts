import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface EquipmentApiDto extends BaseResourceApiDto {
	/**
	 * Flavour description of the equipment.
	 */
	desc: string[];

	/**
	 * Mechanical description of anything this piece of equipment can do that is not expressed in other properties.
	 */
	special: string[];

	/**
	 * The Equipment Category that this equipment belongs to.
	 */
	equipment_category: BaseResourceApiDto;

	/**
	 * The cost of the piece of equipment.
	 */
	cost: CostApiDto;

	/**
	 * The weight of the equipment in pounds (lbs).
	 */
	weight: number;
}

/**
 * Represents the cost of an item or piece of equipment
 */
export interface CostApiDto {
	/**
	 * The amount of the given unit of cost.
	 */
	quantity: number;

	/**
	 * The unit of cost, like gp, sp, cp, etc.
	 */
	unit: string;
}
