import { randomUUID } from 'crypto';
import { AbilityBonusApiDto } from '../../../../../src/types/api/helpers/AbilityBonusApiDto';
import {
	ChoiceApiDto,
	OptionApiDto,
	OptionSetApiDto,
} from '../../../../../src/types/api/helpers/ChoiceApiDto';
import { ResourceReferenceApiDto } from '../../../../../src/types/api/helpers/ResourceReferenceApiDto';
import { AbilityScoreApiDto } from '../../../../../src/types/api/resources/AbilityScoreApiDto';
import { AlignmentApiDto } from '../../../../../src/types/api/resources/AlignmentApiDto';
import {
	ArmorApiDto,
	ArmorClassApiDto,
} from '../../../../../src/types/api/resources/ArmorApiDto';
import {
	BackgroundApiDto,
	BackgroundFeatureApiDto,
} from '../../../../../src/types/api/resources/BackgroundApiDto';
import {
	ClassApiDto,
	MultiClassingApiDto,
	PrerequisiteApiDto,
	SpellCastingApiDto,
	SpellCastingInfoApiDto,
	StartingEquipmentApiDto,
} from '../../../../../src/types/api/resources/ClassApiDto';
import {
	ClassLevelApiDto,
	SpellcastingApiDto,
} from '../../../../../src/types/api/resources/ClassLevelApiDto';
import {
	CostApiDto,
	EquipmentApiDto,
} from '../../../../../src/types/api/resources/EquipmentApiDto';
import { EquipmentCategoryApiDto } from '../../../../../src/types/api/resources/EquipmentCategoryApiDto';
import { FeatureApiDto } from '../../../../../src/types/api/resources/FeatureApiDto';
import { LanguageApiDto } from '../../../../../src/types/api/resources/LanguageApiDto';
import { ProficiencyApiDto } from '../../../../../src/types/api/resources/ProficiencyApiDto';
import { RaceApiDto } from '../../../../../src/types/api/resources/RaceApiDto';
import { SkillApiDto } from '../../../../../src/types/api/resources/SkillApiDto';
import {
	AreaOfEffectApiDto,
	SpellApiDto,
	SpellDamageApiDto,
	SpellDcApiDto,
} from '../../../../../src/types/api/resources/SpellApiDto';
import {
	SubclassApiDto,
	SubclassSpellApiDto,
	SubClassSpellPrerequisiteApiDto,
} from '../../../../../src/types/api/resources/SubclassApiDto';
import { SubraceApiDto } from '../../../../../src/types/api/resources/SubraceApiDto';
import { TraitApiDto } from '../../../../../src/types/api/resources/TraitApiDto';
import {
	DamageApiDto,
	RangeApiDto,
	WeaponApiDto,
} from '../../../../../src/types/api/resources/WeaponApiDto';
import { BaseResourceApiDto } from '../../../../../src/types/api/wrappers/BaseResourceApiDto';

// ==================== Base/Helper DTOs ====================

export function getMockResourceReferenceApiDto(
	partial?: Partial<ResourceReferenceApiDto>,
): ResourceReferenceApiDto {
	return {
		index: partial?.index ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
		url: partial?.url ?? '/api/some-endpoint/some-index',
	};
}

export function getMockBaseResourceApiDto(
	partial?: Partial<BaseResourceApiDto>,
): BaseResourceApiDto {
	return {
		index: partial?.index ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
		url: partial?.url ?? '/api/some-endpoint/some-index',
	};
}

export function getMockAbilityBonusApiDto(
	partial?: Partial<AbilityBonusApiDto>,
): AbilityBonusApiDto {
	return {
		ability_score: partial?.ability_score ?? getMockResourceReferenceApiDto(),
		bonus: partial?.bonus ?? 0,
	};
}

export function getMockChoiceApiDto(
	partial?: Partial<ChoiceApiDto>,
): ChoiceApiDto {
	return {
		desc: partial?.desc ?? 'Choose something',
		choose: partial?.choose ?? 1,
		type: partial?.type ?? 'proficiencies',
		from: partial?.from ?? getMockOptionSetApiDto(),
	};
}

export function getMockOptionSetApiDto(
	partial?: Partial<OptionSetApiDto>,
): OptionSetApiDto {
	return {
		option_set_type: partial?.option_set_type ?? 'options_array',
		resource_list_url: partial?.resource_list_url,
		equipment_category: partial?.equipment_category,
		options: partial?.options ?? [getMockOptionApiDto()],
	};
}

export function getMockOptionApiDto(
	partial?: Partial<OptionApiDto>,
): OptionApiDto {
	return {
		option_type: partial?.option_type ?? 'reference',
		item: partial?.item ?? getMockResourceReferenceApiDto(),
		action_name: partial?.action_name,
		count: partial?.count,
		type: partial?.type,
		items: partial?.items,
		choice: partial?.choice,
		string: partial?.string,
		desc: partial?.desc,
		alignments: partial?.alignments,
		of: partial?.of,
		ability_score: partial?.ability_score,
		minimum_score: partial?.minimum_score,
		bonus: partial?.bonus,
		name: partial?.name,
		dc: partial?.dc,
		damage: partial?.damage,
		damage_type: partial?.damage_type,
		damage_dice: partial?.damage_dice,
		notes: partial?.notes,
	};
}

// ==================== Resource DTOs ====================

export function getMockAbilityScoreApiDto(
	partial?: Partial<AbilityScoreApiDto>,
): AbilityScoreApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? '',
		full_name: partial?.full_name ?? '',
		skills: partial?.skills ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockAlignmentApiDto(
	partial?: Partial<AlignmentApiDto>,
): AlignmentApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		abbreviation: partial?.abbreviation ?? 'N',
		desc: partial?.desc ?? 'Some alignment description',
	};
}

export function getMockLanguageApiDto(
	partial?: Partial<LanguageApiDto>,
): LanguageApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? 'Some language description',
		type: partial?.type ?? 'Standard',
		script: partial?.script ?? 'Common',
		typical_speakers: partial?.typical_speakers ?? ['Humans'],
	};
}

export function getMockSkillApiDto(
	partial?: Partial<SkillApiDto>,
): SkillApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some skill description'],
		ability_score: partial?.ability_score ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockProficiencyApiDto(
	partial?: Partial<ProficiencyApiDto>,
): ProficiencyApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		type: partial?.type ?? 'Skills',
		classes: partial?.classes ?? [getMockResourceReferenceApiDto()],
		races: partial?.races ?? [getMockResourceReferenceApiDto()],
		reference: partial?.reference ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockTraitApiDto(
	partial?: Partial<TraitApiDto>,
): TraitApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some trait description'],
		races: partial?.races ?? [getMockResourceReferenceApiDto()],
		subraces: partial?.subraces ?? [getMockResourceReferenceApiDto()],
		proficiencies: partial?.proficiencies ?? [getMockResourceReferenceApiDto()],
		proficiency_choices: partial?.proficiency_choices,
		language_options: partial?.language_options,
		trait_specific: partial?.trait_specific,
	};
}

export function getMockRaceApiDto(partial?: Partial<RaceApiDto>): RaceApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		speed: partial?.speed ?? 30,
		ability_bonuses: partial?.ability_bonuses ?? [getMockAbilityBonusApiDto()],
		age: partial?.age ?? 'Mature around 20',
		alignment: partial?.alignment ?? 'Usually neutral',
		size: partial?.size ?? 'Medium',
		size_description: partial?.size_description ?? 'About 5-6 feet tall',
		languages: partial?.languages ?? [getMockResourceReferenceApiDto()],
		language_options: partial?.language_options,
		language_desc: partial?.language_desc ?? 'You speak Common',
		traits: partial?.traits ?? [getMockResourceReferenceApiDto()],
		subraces: partial?.subraces ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockSubraceApiDto(
	partial?: Partial<SubraceApiDto>,
): SubraceApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? 'Some subrace description',
		race: partial?.race ?? getMockResourceReferenceApiDto(),
		ability_bonuses: partial?.ability_bonuses ?? [getMockAbilityBonusApiDto()],
		starting_proficiencies: partial?.starting_proficiencies ?? [
			getMockResourceReferenceApiDto(),
		],
		languages: partial?.languages ?? [getMockResourceReferenceApiDto()],
		language_options: partial?.language_options,
		racial_traits: partial?.racial_traits ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockBackgroundApiDto(
	partial?: Partial<BackgroundApiDto>,
): BackgroundApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		starting_proficiencies: partial?.starting_proficiencies ?? [
			getMockResourceReferenceApiDto(),
		],
		language_options: partial?.language_options ?? getMockChoiceApiDto(),
		starting_equipment: partial?.starting_equipment ?? [
			getMockResourceReferenceApiDto(),
		],
		starting_equipment_options:
			partial?.starting_equipment_options ?? getMockChoiceApiDto(),
		feature: partial?.feature ?? getMockBackgroundFeatureApiDto(),
		personality_traits: partial?.personality_traits ?? getMockChoiceApiDto(),
		ideals: partial?.ideals ?? getMockChoiceApiDto(),
		bonds: partial?.bonds ?? getMockChoiceApiDto(),
		flaws: partial?.flaws ?? getMockChoiceApiDto(),
	};
}

export function getMockBackgroundFeatureApiDto(
	partial?: Partial<BackgroundFeatureApiDto>,
): BackgroundFeatureApiDto {
	return {
		name: partial?.name ?? 'Feature Name',
		desc: partial?.desc ?? ['Feature description'],
	};
}

export function getMockClassApiDto(
	partial?: Partial<ClassApiDto>,
): ClassApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		hit_die: partial?.hit_die ?? 8,
		class_levels: partial?.class_levels ?? '/api/classes/fighter/levels',
		multi_classing: partial?.multi_classing ?? getMockMultiClassingApiDto(),
		spellcasting: partial?.spellcasting,
		spells: partial?.spells ?? '/api/classes/wizard/spells',
		starting_equipment: partial?.starting_equipment ?? [
			getMockStartingEquipmentApiDto(),
		],
		starting_equipment_options: partial?.starting_equipment_options ?? [
			getMockChoiceApiDto(),
		],
		proficiency_choices: partial?.proficiency_choices ?? [
			getMockChoiceApiDto(),
		],
		proficiencies: partial?.proficiencies ?? [getMockResourceReferenceApiDto()],
		saving_throws: partial?.saving_throws ?? [getMockResourceReferenceApiDto()],
		subclasses: partial?.subclasses ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockMultiClassingApiDto(
	partial?: Partial<MultiClassingApiDto>,
): MultiClassingApiDto {
	return {
		prerequisites: partial?.prerequisites,
		prerequisite_options: partial?.prerequisite_options,
		proficiencies: partial?.proficiencies ?? [getMockResourceReferenceApiDto()],
		proficiency_choices: partial?.proficiency_choices,
	};
}

export function getMockPrerequisiteApiDto(
	partial?: Partial<PrerequisiteApiDto>,
): PrerequisiteApiDto {
	return {
		ability_score: partial?.ability_score ?? getMockResourceReferenceApiDto(),
		minimum_score: partial?.minimum_score ?? 13,
	};
}

export function getMockSpellCastingApiDto(
	partial?: Partial<SpellCastingApiDto>,
): SpellCastingApiDto {
	return {
		level: partial?.level ?? 1,
		info: partial?.info ?? [getMockSpellCastingInfoApiDto()],
		spellcasting_ability:
			partial?.spellcasting_ability ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockSpellCastingInfoApiDto(
	partial?: Partial<SpellCastingInfoApiDto>,
): SpellCastingInfoApiDto {
	return {
		name: partial?.name ?? 'Spellcasting Info',
		desc: partial?.desc ?? ['Some spellcasting info'],
	};
}

export function getMockStartingEquipmentApiDto(
	partial?: Partial<StartingEquipmentApiDto>,
): StartingEquipmentApiDto {
	return {
		quantity: partial?.quantity ?? 1,
		equipment: partial?.equipment ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockSubclassApiDto(
	partial?: Partial<SubclassApiDto>,
): SubclassApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some subclass description'],
		class: partial?.class ?? getMockResourceReferenceApiDto(),
		subclass_flavor: partial?.subclass_flavor ?? 'Some flavor text',
		subclass_levels: partial?.subclass_levels ?? '/api/subclasses/lore/levels',
		spells: partial?.spells ?? [getMockSubclassSpellApiDto()],
	};
}

export function getMockSubclassSpellApiDto(
	partial?: Partial<SubclassSpellApiDto>,
): SubclassSpellApiDto {
	return {
		prerequisites: partial?.prerequisites ?? [
			getMockSubClassSpellPrerequisiteApiDto(),
		],
		spell: partial?.spell ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockSubClassSpellPrerequisiteApiDto(
	partial?: Partial<SubClassSpellPrerequisiteApiDto>,
): SubClassSpellPrerequisiteApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		type: partial?.type ?? 'level',
	};
}

export function getMockFeatureApiDto(
	partial?: Partial<FeatureApiDto>,
): FeatureApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some feature description'],
		level: partial?.level ?? 1,
		class: partial?.class ?? getMockResourceReferenceApiDto(),
		subclass: partial?.subclass,
		parent: partial?.parent,
		prerequisites: partial?.prerequisites ?? [],
		feature_specific: partial?.feature_specific,
	};
}

export function getMockClassLevelApiDto(
	partial?: Partial<ClassLevelApiDto>,
): ClassLevelApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		level: partial?.level ?? 1,
		ability_score_bonuses: partial?.ability_score_bonuses ?? 0,
		prof_bonus: partial?.prof_bonus ?? 2,
		features: partial?.features ?? [getMockResourceReferenceApiDto()],
		spellcasting: partial?.spellcasting,
		class_specific: partial?.class_specific ?? {},
		class: partial?.class ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockSpellcastingApiDto(
	partial?: Partial<SpellcastingApiDto>,
): SpellcastingApiDto {
	return {
		cantrips_known: partial?.cantrips_known ?? 0,
		spells_known: partial?.spells_known ?? 0,
		spell_slots_level_1: partial?.spell_slots_level_1 ?? 0,
		spell_slots_level_2: partial?.spell_slots_level_2 ?? 0,
		spell_slots_level_3: partial?.spell_slots_level_3 ?? 0,
		spell_slots_level_4: partial?.spell_slots_level_4 ?? 0,
		spell_slots_level_5: partial?.spell_slots_level_5 ?? 0,
		spell_slots_level_6: partial?.spell_slots_level_6 ?? 0,
		spell_slots_level_7: partial?.spell_slots_level_7 ?? 0,
		spell_slots_level_8: partial?.spell_slots_level_8 ?? 0,
		spell_slots_level_9: partial?.spell_slots_level_9 ?? 0,
	};
}

export function getMockEquipmentApiDto(
	partial?: Partial<EquipmentApiDto>,
): EquipmentApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some equipment description'],
		special: partial?.special ?? [],
		equipment_category:
			partial?.equipment_category ?? getMockResourceReferenceApiDto(),
		cost: partial?.cost ?? getMockCostApiDto(),
		weight: partial?.weight ?? 0,
	};
}

export function getMockCostApiDto(partial?: Partial<CostApiDto>): CostApiDto {
	return {
		quantity: partial?.quantity ?? 1,
		unit: partial?.unit ?? 'gp',
	};
}

export function getMockEquipmentCategoryApiDto(
	partial?: Partial<EquipmentCategoryApiDto>,
): EquipmentCategoryApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		equipment: partial?.equipment ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockArmorApiDto(
	partial?: Partial<ArmorApiDto>,
): ArmorApiDto {
	return {
		...getMockEquipmentApiDto(partial),
		armor_category: partial?.armor_category ?? 'Light',
		armor_class: partial?.armor_class ?? getMockArmorClassApiDto(),
		str_minimum: partial?.str_minimum ?? 0,
		stealth_disadvantage: partial?.stealth_disadvantage ?? false,
	};
}

export function getMockArmorClassApiDto(
	partial?: Partial<ArmorClassApiDto>,
): ArmorClassApiDto {
	return {
		base: partial?.base ?? 11,
		dex_bonus: partial?.dex_bonus ?? true,
		max_bonus: partial?.max_bonus,
	};
}

export function getMockWeaponApiDto(
	partial?: Partial<WeaponApiDto>,
): WeaponApiDto {
	return {
		...getMockEquipmentApiDto(partial),
		weapon_category: partial?.weapon_category ?? 'Simple',
		weapon_range: partial?.weapon_range ?? 'Melee',
		category_range: partial?.category_range ?? 'Simple Melee',
		damage: partial?.damage ?? getMockDamageApiDto(),
		range: partial?.range ?? getMockRangeApiDto(),
		throw_range: partial?.throw_range,
		properties: partial?.properties ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockDamageApiDto(
	partial?: Partial<DamageApiDto>,
): DamageApiDto {
	return {
		damage_dice: partial?.damage_dice ?? '1d6',
		damage_type: partial?.damage_type ?? getMockResourceReferenceApiDto(),
	};
}

export function getMockRangeApiDto(
	partial?: Partial<RangeApiDto>,
): RangeApiDto {
	return {
		normal: partial?.normal ?? 5,
		long: partial?.long ?? 15,
	};
}

export function getMockSpellApiDto(
	partial?: Partial<SpellApiDto>,
): SpellApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? ['Some spell description'],
		higher_level: partial?.higher_level,
		range: partial?.range ?? '30 feet',
		components: partial?.components ?? ['V', 'S'],
		material: partial?.material,
		area_of_effect: partial?.area_of_effect,
		ritual: partial?.ritual ?? false,
		duration: partial?.duration ?? 'Instantaneous',
		concentration: partial?.concentration ?? false,
		casting_time: partial?.casting_time ?? '1 action',
		level: partial?.level ?? 1,
		attack_type: partial?.attack_type,
		damage: partial?.damage,
		dc: partial?.dc,
		school: partial?.school ?? getMockResourceReferenceApiDto(),
		classes: partial?.classes ?? [getMockResourceReferenceApiDto()],
		subclasses: partial?.subclasses ?? [getMockResourceReferenceApiDto()],
	};
}

export function getMockAreaOfEffectApiDto(
	partial?: Partial<AreaOfEffectApiDto>,
): AreaOfEffectApiDto {
	return {
		size: partial?.size ?? 20,
		type: partial?.type ?? 'sphere',
	};
}

export function getMockSpellDamageApiDto(
	partial?: Partial<SpellDamageApiDto>,
): SpellDamageApiDto {
	return {
		damage_type: partial?.damage_type ?? getMockResourceReferenceApiDto(),
		damage_at_slot_level: partial?.damage_at_slot_level,
		damage_at_character_level: partial?.damage_at_character_level,
	};
}

export function getMockSpellDcApiDto(
	partial?: Partial<SpellDcApiDto>,
): SpellDcApiDto {
	return {
		dc_type: partial?.dc_type ?? getMockResourceReferenceApiDto(),
		dc_value: partial?.dc_value ?? 0,
		dc_success: partial?.dc_success ?? 'none',
	};
}
