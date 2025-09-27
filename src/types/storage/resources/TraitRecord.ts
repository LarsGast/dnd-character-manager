import { ChoiceRecord } from '../helpers/ChoiceRecord.js';
import { BaseResourceRecord } from '../wrappers/BaseResourceRecord.js';

export interface TraitRecord extends BaseResourceRecord {
	/**
	 * Description of the trait.
	 * Can consist of multiple paragraphs.
	 */
	desc: string[];

	/**
	 * List of proficiencies that this trait provides.
	 */
	proficiencies: BaseResourceRecord[];

	/**
	 * If applicable, a choice in proficiencies that the player can make when getting this trait.
	 */
	proficiency_choices?: ChoiceRecord;

	/**
	 * If applicable, a choice in languages that the player can make when getting this trait.
	 */
	language_options?: ChoiceRecord;

	/**
	 * Any extra trait-specific information.
	 * Can differ in specification per trait.
	 */
	trait_specific?: any;
}
