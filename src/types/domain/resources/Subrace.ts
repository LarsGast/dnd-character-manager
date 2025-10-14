import { AbilityBonus } from '../helpers/AbilityBonus';
import { BaseResource } from '../wrappers/BaseResource';
import { Choice } from '../helpers/Choice';
import { ResourceReference } from '../helpers/ResourceReference';

export interface Subrace extends BaseResource {
	/**
	 * Flavor description of the subrace.
	 */
	desc: string;

	/**
	 * The race that the subrace is a part of.
	 */
	race: ResourceReference;

	/**
	 * Bonuses to abilities this subrace gives.
	 */
	ability_bonuses: AbilityBonus[];

	/**
	 * A list of proficiencies the subrace starts with.
	 */
	starting_proficiencies: ResourceReference[];

	/**
	 * List of languages the subrace always learns.
	 */
	languages: ResourceReference[];

	/**
	 * If applicable, a choice in languages that the player can make choosing this subrace.
	 */
	language_options?: Choice;

	/**
	 * A list of traits the subrace has.
	 */
	racial_traits: ResourceReference[];
}
