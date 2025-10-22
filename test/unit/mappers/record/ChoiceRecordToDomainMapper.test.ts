import { it, expect } from 'vitest';
import { ChoiceRecordToDomainMapper } from '../../../../src/mappers/record/ChoiceRecordToDomainMapper';
import {
	getMockChoiceRecord,
	getMockOptionSetRecord,
	getMockOptionRecord,
	getMockResourceReferenceRecord,
} from './testUtils/RecordTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';
import {
	OptionRecord,
	OptionSetRecord,
} from '../../../../src/types/storage/helpers/ChoiceRecord';

it('should map all non-reference properties from record to domain correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const record = getMockChoiceRecord({
		desc: 'Choose a skill',
		choose: 2,
		type: 'proficiencies',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.desc).toBe('Choose a skill');
	expect(result.choose).toBe(2);
	expect(result.type).toBe('proficiencies');
});

it('should map option set properties correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const optionSet = getMockOptionSetRecord({
		option_set_type: 'options_array',
		resource_list_url: '/api/proficiencies',
		equipment_category: 'Armor',
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.option_set_type).toBe('options_array');
	expect(result.from.resource_list_url).toBe('/api/proficiencies');
	expect(result.from.equipment_category).toBe('Armor');
});

it('should map options array when present', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const options = [
		getMockOptionRecord({ option_type: 'reference' }),
		getMockOptionRecord({ option_type: 'string' }),
	];
	const optionSet = getMockOptionSetRecord({
		options: options,
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options).toHaveLength(2);
	expect(result.from.options![0].option_type).toBe('reference');
	expect(result.from.options![1].option_type).toBe('string');
});

it('should handle empty options array in option set', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const optionSet = getMockOptionSetRecord({
		options: [],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options).toEqual([]);
});

it('should handle undefined options array in option set', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const mockFrom: OptionSetRecord = {
		option_set_type: 'options_array',
		resource_list_url: '/api/proficiencies',
		equipment_category: 'Armor',
		options: undefined,
	};
	const record = getMockChoiceRecord({
		from: mockFrom,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options).toBeUndefined();
});

it('should map reference option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const itemRef = getMockResourceReferenceRecord();
	const option = getMockOptionRecord({
		option_type: 'reference',
		item: itemRef,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(itemRef);
});

it('should map action option type properties correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'action',
		action_name: 'Attack',
		count: 2,
		type: 'melee',
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].action_name).toBe('Attack');
	expect(result.from.options![0].count).toBe(2);
	expect(result.from.options![0].type).toBe('melee');
});

it('should map multiple option type correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const nestedOptions = [
		getMockOptionRecord({ option_type: 'string', string: 'Option 1' }),
		getMockOptionRecord({ option_type: 'string', string: 'Option 2' }),
	];
	const option = getMockOptionRecord({
		option_type: 'multiple',
		items: nestedOptions,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].items).toHaveLength(2);
	expect(result.from.options![0].items![0].string).toBe('Option 1');
	expect(result.from.options![0].items![1].string).toBe('Option 2');
});

it('should map nested choice option type correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const nestedChoice = getMockChoiceRecord({
		desc: 'Nested choice',
		choose: 1,
	});
	const option = getMockOptionRecord({
		option_type: 'choice',
		choice: nestedChoice,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].choice).toBeDefined();
	expect(result.from.options![0].choice!.desc).toBe('Nested choice');
	expect(result.from.options![0].choice!.choose).toBe(1);
});

it('should map string option type correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'string',
		string: 'Some string value',
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].string).toBe('Some string value');
});

it('should map ideal option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const alignments = [
		getMockResourceReferenceRecord(),
		getMockResourceReferenceRecord(),
	];
	const option = getMockOptionRecord({
		option_type: 'ideal',
		desc: 'Ideal description',
		alignments: alignments,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(alignments[0]);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(alignments[1]);
});

it('should map counted_reference option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const ofRef = getMockResourceReferenceRecord();
	const option = getMockOptionRecord({
		option_type: 'counted_reference',
		count: 3,
		of: ofRef,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(ofRef);
});

it('should map score_prerequisite option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const abilityScore = getMockResourceReferenceRecord();
	const option = getMockOptionRecord({
		option_type: 'score_prerequisite',
		ability_score: abilityScore,
		minimum_score: 13,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(abilityScore);
});

it('should map ability_bonus option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const abilityScore = getMockResourceReferenceRecord();
	const option = getMockOptionRecord({
		option_type: 'ability_bonus',
		ability_score: abilityScore,
		bonus: 2,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(abilityScore);
});

it('should map breath option type correctly', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'breath',
		name: 'Fire Breath',
		dc: 15,
		damage: '2d6',
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].name).toBe('Fire Breath');
	expect(result.from.options![0].dc).toBe(15);
	expect(result.from.options![0].damage).toBe('2d6');
});

it('should map damage option type correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceRecordToDomainMapper(resourceReferenceMapper);
	const damageType = getMockResourceReferenceRecord();
	const option = getMockOptionRecord({
		option_type: 'damage',
		damage_type: damageType,
		damage_dice: '1d8',
		notes: 'Additional damage notes',
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(damageType);
});

it('should handle option with undefined item reference', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option: OptionRecord = {
		option_type: 'reference',
		item: undefined,
		action_name: undefined,
		count: undefined,
		type: undefined,
		items: undefined,
		choice: undefined,
		string: undefined,
		desc: undefined,
		alignments: undefined,
		of: undefined,
		ability_score: undefined,
		minimum_score: undefined,
		bonus: undefined,
		name: undefined,
		dc: undefined,
		damage: undefined,
		damage_type: undefined,
		damage_dice: undefined,
		notes: undefined,
	};
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].item).toBeUndefined();
});

it('should handle option with undefined choice reference', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option: OptionRecord = {
		option_type: 'choice',
		item: undefined,
		action_name: undefined,
		count: undefined,
		type: undefined,
		items: undefined,
		choice: undefined,
		string: undefined,
		desc: undefined,
		alignments: undefined,
		of: undefined,
		ability_score: undefined,
		minimum_score: undefined,
		bonus: undefined,
		name: undefined,
		dc: undefined,
		damage: undefined,
		damage_type: undefined,
		damage_dice: undefined,
		notes: undefined,
	};
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].choice).toBeUndefined();
});

it('should handle option with undefined alignments array', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'ideal',
		alignments: undefined,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].alignments).toBeUndefined();
});

it('should handle option with undefined of reference', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'counted_reference',
		of: undefined,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].of).toBeUndefined();
});

it('should handle option with undefined ability_score reference', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'ability_bonus',
		ability_score: undefined,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].ability_score).toBeUndefined();
});

it('should handle option with undefined damage_type reference', () => {
	// Arrange
	const mapper = new ChoiceRecordToDomainMapper(getMockMapper());
	const option = getMockOptionRecord({
		option_type: 'damage',
		damage_type: undefined,
	});
	const optionSet = getMockOptionSetRecord({
		options: [option],
	});
	const record = getMockChoiceRecord({
		from: optionSet,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.from.options![0].damage_type).toBeUndefined();
});
