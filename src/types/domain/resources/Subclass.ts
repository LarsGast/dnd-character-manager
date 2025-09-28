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
