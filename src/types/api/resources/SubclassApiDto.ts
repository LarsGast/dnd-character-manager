import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface SubclassApiDto extends BaseResourceApiDto {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Class that the subclass belongs to.
	 */
	class: ResourceReferenceApiDto;

	/**
	 * Lore-friendly flavor text for a classes respective subclass.
	 */
	subclass_flavor: string;

	/**
	 * Resource url that shows the subclass level progression.
	 */
	subclass_levels: string;

	/**
	 * Subclass specific spells.
	 */
	spells?: SubclassSpellApiDto[];
}

export interface SubclassSpellApiDto {
	prerequisites: SubClassSpellPrerequisiteApiDto[];
	spell: ResourceReferenceApiDto;
}

export interface SubClassSpellPrerequisiteApiDto extends BaseResourceApiDto {
	type: string;
}
