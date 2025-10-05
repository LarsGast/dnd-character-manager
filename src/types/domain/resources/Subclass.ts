import { BaseResource } from '../wrappers/BaseResource.js';

export interface Subclass extends BaseResource {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Class that the subclass belongs to.
	 */
	class?: BaseResource;

	/**
	 * Subclass specific spells.
	 */
	spells: SubclassSpell[];

	/**
	 * Features gained at specific levels.
	 */
	features: SubclassFeature[];
}

export interface SubclassSpell {
	level: number;
	spell: BaseResource;
}

export interface SubclassFeature {
	name: string;
	level: number;
	description: string;
}
