import { Choice } from '../helpers/Choice';
import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface Trait extends BaseResource {
	/**
	 * Description of the trait.
	 * Can consist of multiple paragraphs.
	 */
	desc: string[];

	/**
	 * List of races that get this trait.
	 */
	races: ResourceReference[];

	/**
	 * List of subraces that get this trait.
	 */
	subraces: ResourceReference[];

	/**
	 * List of proficiencies that this trait provides.
	 */
	proficiencies: ResourceReference[];

	/**
	 * If applicable, a choice in proficiencies that the player can make when getting this trait.
	 */
	proficiency_choices?: Choice;

	/**
	 * If applicable, a choice in languages that the player can make when getting this trait.
	 */
	language_options?: Choice;

	/**
	 * Any extra trait-specific information.
	 * Can differ in specification per trait.
	 */
	trait_specific?: any;
}
