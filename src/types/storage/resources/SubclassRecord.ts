import { BaseResourceRecord } from '../wrappers/BaseResourceRecord.js';

export interface SubclassRecord extends BaseResourceRecord {
	/**
	 * Class that the subclass belongs to.
	 */
	class: BaseResourceRecord;

	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * Subclass specific spells.
	 */
	spells: SubclassSpellRecord[];
}

export interface SubclassSpellRecord {
	level: number;
	spell: BaseResourceRecord;
}
