import type { ResourceType } from '../../domain/helpers/ResourceType';

/**
 * Enum for resource types for communication with the API.
 * @see {@link ResourceType}
 */
export enum ResourceTypeApiDto {
	AbilityScore = 'ability_score',
	Alignment = 'alignment',
	Armor = 'armor',
	Background = 'background',
	Class = 'class',
	ClassLevel = 'class_level',
	Equipment = 'equipment',
	EquipmentCategory = 'equipment_category',
	Feature = 'feature',
	Language = 'language',
	Proficiency = 'proficiency',
	Race = 'race',
	Skill = 'skill',
	Spell = 'spell',
	Subclass = 'subclass',
	Subrace = 'subrace',
	Trait = 'trait',
	Weapon = 'weapon',
}
