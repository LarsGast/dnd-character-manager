import { BaseResource } from '../wrappers/BaseResource';

export interface Spell extends BaseResource {
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

	area_of_effect?: AreaOfEffect;

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

	damage?: SpellDamage;

	dc?: SpellDc;

	school: BaseResource;

	/**
	 * List of classes that are able to learn the spell.
	 */
	classes: BaseResource[];

	/**
	 * List of subclasses that have access to the spell.
	 */
	subclasses: BaseResource[];
}

export interface AreaOfEffect {
	size: number;
	type: 'sphere' | 'cone' | 'cube' | 'cylinder' | 'line';
}

export interface SpellDamage {
	damage_type: BaseResource;
	damage_at_slot_level?: { [key: string]: string };
	damage_at_character_level?: { [key: string]: string };
}
export interface SpellDamageAtSlotLevel {
	[key: string]: string;
}

export interface SpellDamageAtCharacterLevel {
	[key: string]: string;
}

export interface SpellDc {
	dc_type: BaseResource;
	dc_value: number;
	dc_success: 'none' | 'half' | 'other';
}
