import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';

export interface SubclassApiDto extends BaseResourceApiDto {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Class that the subclass belongs to.
	 */
	class: BaseResourceApiDto;

	/**
	 * Lore-friendly flavor text for a classes respective subclass.
	 */
	subclass_flavor: string;

	/**
	 * Resource url that shows the subclass level progression.
	 */
	subclass_levels: string[];

	/**
	 * Subclass specific spells.
	 */
	spells: object[];
}
