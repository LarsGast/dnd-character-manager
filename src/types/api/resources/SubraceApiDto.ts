import { AbilityBonusApiDto } from '../helpers/AbilityBonusApiDto.js';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';
import { ChoiceApiDto } from '../helpers/ChoiceApiDto.js';

export interface SubraceApiDto extends BaseResourceApiDto {
	/**
	 * Flavor description of the subrace.
	 */
	desc: string;

	/**
	 * The race that the subrace is a part of.
	 */
	race: BaseResourceApiDto;

	/**
	 * Bonuses to abilities this subrace gives.
	 */
	ability_bonuses: AbilityBonusApiDto[];

	/**
	 * A list of proficiencies the subrace starts with.
	 */
	starting_proficiencies: BaseResourceApiDto[];

	/**
	 * List of languages the subrace always learns.
	 */
	languages: BaseResourceApiDto[];

	/**
	 * If applicable, a choice in languages that the player can make choosing this subrace.
	 */
	language_options?: ChoiceApiDto;

	/**
	 * A list of traits the subrace has.
	 */
	racial_traits: BaseResourceApiDto[];
}
