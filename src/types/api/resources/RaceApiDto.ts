import { AbilityBonusApiDto } from '../helpers/AbilityBonusApiDto.js';
import { ChoiceApiDto } from '../helpers/ChoiceApiDto.js';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';

export interface RaceApiDto extends BaseResourceApiDto {
	/**
	 * Speed of the race in feet per round.
	 */
	speed: number;

	/**
	 * Bonuses to abilities this race gives.
	 */
	ability_bonuses: AbilityBonusApiDto[];

	/**
	 * Flavor description of the typical age of the race.
	 */
	age: string;

	/**
	 * Flavor description of the typical alignments of the race.
	 */
	alignment: string;

	/**
	 * In-game size of the race.
	 */
	size: string;

	/**
	 * Flavor description of the typical size of the race.
	 */
	size_description: string;

	/**
	 * Starting languages for all new characters of this race.
	 */
	languages: BaseResourceApiDto[];

	/**
	 * Starting language options for all new characters of this race.
	 */
	language_options?: ChoiceApiDto;

	/**
	 * Flavor description of the languages known by the race.
	 */
	language_desc: string;

	/**
	 * A list of traits the race has.
	 */
	traits: BaseResourceApiDto[];

	/**
	 * A list of subraces the race has, if any.
	 */
	subraces: BaseResourceApiDto[];
}
