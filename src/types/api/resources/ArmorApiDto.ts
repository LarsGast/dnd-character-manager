import { EquipmentApiDto } from './EquipmentApiDto';

export interface ArmorApiDto extends EquipmentApiDto {
	/**
	 * Category of armor, such as "Light", "Medium", and "Heavy".
	 */
	armor_category: string;

	/**
	 * The base armor class of the armor. Can be used to calculate effective armor class.
	 */
	armor_class: ArmorClassApiDto;

	/**
	 * The minimum STR score required to don this armor.
	 */
	str_minimum: number;

	/**
	 * If wearing this armor imposes disadvantage on stealth checks.
	 */
	stealth_disadvantage: boolean;
}

/**
 * Holds information about the armor class of a piece of armor.
 */
export interface ArmorClassApiDto {
	/**
	 * Base AC every character gets while wearing the armor.
	 */
	base: number;

	/**
	 * Wether a DEX bonus applies to the armor.
	 */
	dex_bonus: boolean;

	/**
	 * The maximum amount of DEX bonus the armor gets.
	 * undefined if dex_bonus is false or it has no maximum.
	 */
	max_bonus: number | undefined;
}
