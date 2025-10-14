import { AbilityBonusApiDto } from '../helpers/AbilityBonusApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';
import { ChoiceApiDto } from '../helpers/ChoiceApiDto';
import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';

export interface SubraceApiDto extends BaseResourceApiDto {
	/**
	 * Flavor description of the subrace.
	 */
	desc: string;

	/**
	 * The race that the subrace is a part of.
	 */
	race: ResourceReferenceApiDto;

	/**
	 * Bonuses to abilities this subrace gives.
	 */
	ability_bonuses: AbilityBonusApiDto[];

	/**
	 * A list of proficiencies the subrace starts with.
	 */
	starting_proficiencies: ResourceReferenceApiDto[];

	/**
	 * List of languages the subrace always learns.
	 */
	languages: ResourceReferenceApiDto[];

	/**
	 * If applicable, a choice in languages that the player can make choosing this subrace.
	 */
	language_options?: ChoiceApiDto;

	/**
	 * A list of traits the subrace has.
	 */
	racial_traits: ResourceReferenceApiDto[];
}
