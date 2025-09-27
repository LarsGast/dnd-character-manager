import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';

export interface ClassLevelApiDto extends BaseResourceApiDto {
	/**
	 * The number value for the current level object.
	 */
	level: number;

	/**
	 * Total number of ability score bonuses gained, added from previous levels.
	 */
	ability_score_bonuses: number;

	/**
	 * Proficiency bonus for this class at the specified level.
	 */
	prof_bonus: number;

	/**
	 * Features automatically gained at this level.
	 */
	features: BaseResourceApiDto[];

	/**
	 * Summary of spells known at this level
	 */
	spellcasting?: SpellcastingApiDto;

	/**
	 * Class specific information such as dice values for bard songs and number of warlock invocations.
	 */
	class_specific: any;

	/**
	 * The class this object belongs to.
	 */
	class: BaseResourceApiDto;
}

export interface SpellcastingApiDto {
	cantrips_known: number;

	spells_known: number;

	spell_slots_level_1: number;

	spell_slots_level_2: number;

	spell_slots_level_3: number;

	spell_slots_level_4: number;

	spell_slots_level_5: number;

	spell_slots_level_6: number;

	spell_slots_level_7: number;

	spell_slots_level_8: number;

	spell_slots_level_9: number;
}
