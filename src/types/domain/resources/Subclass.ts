import { BaseResource } from '../wrappers/BaseResource.js';

export interface Subclass extends BaseResource {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Class that the subclass belongs to.
	 */
	class: BaseResource;

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
	spells: SubclassSpell[];
}

export interface SubclassSpell {
	prerequisites: SubClassSpellPrerequisite[];
	spell: BaseResource;
}

export interface SubClassSpellPrerequisite extends BaseResource {
	type: string;
}
