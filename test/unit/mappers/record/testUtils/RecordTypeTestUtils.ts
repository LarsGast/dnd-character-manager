import { randomUUID } from 'crypto';
import { BaseResourceRecord } from '../../../../../src/types/storage/wrappers/BaseResourceRecord';
import { ResourceReferenceRecord } from '../../../../../src/types/storage/helpers/ResourceReferenceRecord';
import { AbilityBonusRecord } from '../../../../../src/types/storage/helpers/AbilityBonusRecord';
import {
	ChoiceRecord,
	OptionRecord,
	OptionSetRecord,
} from '../../../../../src/types/storage/helpers/ChoiceRecord';
import {
	RaceRecord,
	RaceTraitRecord,
} from '../../../../../src/types/storage/resources/RaceRecord';
import {
	SubclassRecord,
	SubclassSpellRecord,
	SubclassFeatureRecord,
} from '../../../../../src/types/storage/resources/SubclassRecord';

// ==================== Base/Helper Records ====================

export function getMockResourceReferenceRecord(
	partial?: Partial<ResourceReferenceRecord>,
): ResourceReferenceRecord {
	return {
		id: partial?.id ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
	};
}

export function getMockBaseResourceRecord(
	partial?: Partial<BaseResourceRecord>,
): BaseResourceRecord {
	return {
		version: partial?.version ?? 1,
		id: partial?.id ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
		resourceType: partial?.resourceType ?? 'test-resource',
		notes: partial?.notes,
	};
}

export function getMockAbilityBonusRecord(
	partial?: Partial<AbilityBonusRecord>,
): AbilityBonusRecord {
	return {
		ability_score: partial?.ability_score ?? getMockResourceReferenceRecord(),
		bonus: partial?.bonus ?? 0,
	};
}

export function getMockChoiceRecord(
	partial?: Partial<ChoiceRecord>,
): ChoiceRecord {
	return {
		desc: partial?.desc ?? 'Choose something',
		choose: partial?.choose ?? 1,
		type: partial?.type ?? 'proficiencies',
		from: partial?.from ?? getMockOptionSetRecord(),
	};
}

export function getMockOptionSetRecord(
	partial?: Partial<OptionSetRecord>,
): OptionSetRecord {
	return {
		option_set_type: partial?.option_set_type ?? 'options_array',
		resource_list_url: partial?.resource_list_url,
		equipment_category: partial?.equipment_category,
		options: partial?.options,
	};
}

export function getMockOptionRecord(
	partial?: Partial<OptionRecord>,
): OptionRecord {
	return {
		option_type: partial?.option_type ?? 'reference',
		item: partial?.item,
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

// ==================== Resource Records ====================

export function getMockRaceRecord(partial?: Partial<RaceRecord>): RaceRecord {
	const baseRecord = getMockBaseResourceRecord({
		resourceType: 'races',
		...partial,
	});

	return {
		...baseRecord,
		speed: partial?.speed ?? 30,
		ability_bonuses: partial?.ability_bonuses ?? [],
		age: partial?.age ?? 'Reaches adulthood around 20',
		alignment: partial?.alignment ?? 'Tends toward neutrality',
		size: partial?.size ?? 'Medium',
		size_description: partial?.size_description ?? 'Between 5 and 6 feet tall',
		languages: partial?.languages ?? [],
		language_options: partial?.language_options,
		language_desc: partial?.language_desc ?? 'You can speak Common',
		traits: partial?.traits ?? [],
	};
}

export function getMockRaceTraitRecord(
	partial?: Partial<RaceTraitRecord>,
): RaceTraitRecord {
	return {
		name: partial?.name ?? 'Some Trait',
		description: partial?.description ?? 'Trait description',
	};
}

export function getMockSubclassRecord(
	partial?: Partial<SubclassRecord>,
): SubclassRecord {
	const baseRecord = getMockBaseResourceRecord({
		resourceType: 'subclasses',
		...partial,
	});

	return {
		...baseRecord,
		desc: partial?.desc ?? ['Subclass description'],
		class: partial?.class ?? getMockResourceReferenceRecord(),
		spells: partial?.spells ?? [],
		features: partial?.features ?? [],
	};
}

export function getMockSubclassSpellRecord(
	partial?: Partial<SubclassSpellRecord>,
): SubclassSpellRecord {
	return {
		level: partial?.level ?? 1,
		spell: partial?.spell ?? getMockResourceReferenceRecord(),
	};
}

export function getMockSubclassFeatureRecord(
	partial?: Partial<SubclassFeatureRecord>,
): SubclassFeatureRecord {
	return {
		name: partial?.name ?? 'Some Feature',
		level: partial?.level ?? 1,
		description: partial?.description ?? 'Feature description',
	};
}
