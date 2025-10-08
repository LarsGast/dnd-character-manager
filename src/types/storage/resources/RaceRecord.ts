import { AbilityBonusRecord } from '../helpers/AbilityBonusRecord';
import { ChoiceRecord } from '../helpers/ChoiceRecord';
import { BaseResourceRecord } from '../wrappers/BaseResourceRecord';

export interface RaceRecord extends BaseResourceRecord {
	/**
	 * Speed of the race in feet per round.
	 */
	speed: number;

	/**
	 * Bonuses to abilities this race gives.
	 */
	ability_bonuses: AbilityBonusRecord[];

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
	languages: BaseResourceRecord[];

	/**
	 * Starting language options for all new characters of this race.
	 */
	language_options?: ChoiceRecord;

	/**
	 * Flavor description of the languages known by the race.
	 */
	language_desc: string;

	/**
	 * A list of traits the race has.
	 */
	traits: RaceTraitRecord[];
}

export interface RaceTraitRecord {
	name: string;
	description: string;
}
