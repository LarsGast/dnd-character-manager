import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface Subclass extends BaseResource {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Class that the subclass belongs to.
	 */
	class?: ResourceReference;

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
	spell: ResourceReference;
}

export interface SubclassFeature {
	name: string;
	level: number;
	description: string;
}
