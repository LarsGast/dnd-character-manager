import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface SpellApiDto extends BaseResourceApiDto {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * List of descriptions for casting the spell at higher levels.
	 */
	higher_level?: string[];

	/**
	 * Range of the spell, usually expressed in feet.
	 */
	range: string;

	/**
	 * List of shorthand for required components of the spell. V: verbal S: somatic M: material
	 */
	components: ('V' | 'S' | 'M')[];

	/**
	 * Material component for the spell to be cast.
	 */
	material?: string;

	area_of_effect?: AreaOfEffectApiDto;

	/**
	 * Determines if a spell can be cast in a 10-min(in-game) ritual.
	 */
	ritual: boolean;

	/**
	 * How long the spell effect lasts.
	 */
	duration: string;

	/**
	 * Determines if a spell needs concentration to persist.
	 */
	concentration: boolean;

	/**
	 * How long it takes for the spell to activate.
	 */
	casting_time: string;

	/**
	 * Level of the spell.
	 */
	level: number;

	/**
	 * Attack type of the spell.
	 */
	attack_type?: string;

	damage?: SpellDamageApiDto;

	dc?: SpellDcApiDto;

	school: ResourceReferenceApiDto;

	/**
	 * List of classes that are able to learn the spell.
	 */
	classes: ResourceReferenceApiDto[];

	/**
	 * List of subclasses that have access to the spell.
	 */
	subclasses: ResourceReferenceApiDto[];
}

export interface AreaOfEffectApiDto {
	size: number;
	type: 'sphere' | 'cone' | 'cube' | 'cylinder' | 'line';
}

export interface SpellDamageApiDto {
	damage_type: ResourceReferenceApiDto;
	damage_at_slot_level?: { [key: string]: string };
	damage_at_character_level?: { [key: string]: string };
}
export interface SpellDamageAtSlotLevelApiDto {
	[key: string]: string;
}

export interface SpellDamageAtCharacterLevelApiDto {
	[key: string]: string;
}

export interface SpellDcApiDto {
	dc_type: ResourceReferenceApiDto;
	dc_value: number;
	dc_success: 'none' | 'half' | 'other';
}
