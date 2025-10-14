import { ResourceReferenceRecord } from '../helpers/ResourceReferenceRecord';
import { BaseResourceRecord } from '../wrappers/BaseResourceRecord';

export interface SubclassRecord extends BaseResourceRecord {
	/**
	 * Class that the subclass belongs to.
	 */
	class: ResourceReferenceRecord;

	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Subclass specific spells.
	 */
	spells: SubclassSpellRecord[];

	/**
	 * Features gained at specific levels.
	 */
	features: SubclassFeatureRecord[];
}

export interface SubclassSpellRecord {
	level: number;
	spell: ResourceReferenceRecord;
}

export interface SubclassFeatureRecord {
	name: string;
	level: number;
	description: string;
}
