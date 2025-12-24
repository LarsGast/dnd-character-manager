import { it, expect } from 'vitest';
import { ChoiceApiToDomainMapper } from '../../../../src/mappers/api-to-domain/ChoiceApiToDomainMapper';
import {
	getMockChoiceApiDto,
	getMockOptionSetApiDto,
	getMockOptionApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';
import {
	OptionApiDto,
	OptionSetApiDto,
} from '../../../../src/types/api/helpers/ChoiceApiDto';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const apiDto = getMockChoiceApiDto({
		desc: 'Choose a skill',
		choose: 2,
		type: 'proficiencies',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toBe('Choose a skill');
	expect(result.choose).toBe(2);
	expect(result.type).toBe('proficiencies');
});

it('should map option set properties correctly', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const optionSet = getMockOptionSetApiDto({
		option_set_type: 'options_array',
		resource_list_url: '/api/proficiencies',
		equipment_category: 'Armor',
	});
	const apiDto = getMockChoiceApiDto({
		from: optionSet,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.option_set_type).toBe('options_array');
	expect(result.from.resource_list_url).toBe('/api/proficiencies');
	expect(result.from.equipment_category).toBe('Armor');
});

it('should map options array when present', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const options = [
		getMockOptionApiDto({ option_type: 'reference' }),
		getMockOptionApiDto({ option_type: 'string' }),
	];
	const optionSet = getMockOptionSetApiDto({
		options: options,
	});
	const apiDto = getMockChoiceApiDto({
		from: optionSet,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options).toHaveLength(2);
	expect(result.from.options![0].option_type).toBe('reference');
	expect(result.from.options![1].option_type).toBe('string');
});

it('should handle empty options array in option set', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const optionSet = getMockOptionSetApiDto({
		options: [],
	});
	const apiDto = getMockChoiceApiDto({
		from: optionSet,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options).toEqual([]);
});

it('should handle undefined options array in option set', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const mockFrom: OptionSetApiDto = {
		option_set_type: 'options_array',
		resource_list_url: '/api/proficiencies',
		equipment_category: 'Armor',
		options: undefined,
	};
	const apiDto = getMockChoiceApiDto({
		from: mockFrom,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options).toBeUndefined();
});

it('should map option item reference when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceApiToDomainMapper(resourceReferenceMapper);
	const item = getMockResourceReferenceApiDto();
	const option = getMockOptionApiDto({
		option_type: 'reference',
		item: item,
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(item);
});

it('should handle undefined item in option', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceApiToDomainMapper(resourceReferenceMapper);
	const option: OptionApiDto = {
		option_type: 'reference',
		item: undefined,
	};
	const from = getMockOptionSetApiDto({ options: [option] });
	const apiDto = getMockChoiceApiDto({
		from: from,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options![0].item).toBeUndefined();
});

it('should map nested options (items array) recursively', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const nestedOption = getMockOptionApiDto({ option_type: 'reference' });
	const option = getMockOptionApiDto({
		option_type: 'multiple',
		items: [nestedOption],
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options![0].items).toHaveLength(1);
	expect(result.from.options![0].items![0].option_type).toBe('reference');
});

it('should map nested choice recursively', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const nestedChoice = getMockChoiceApiDto({
		desc: 'Nested choice',
		choose: 1,
	});
	const option = getMockOptionApiDto({
		option_type: 'choice',
		choice: nestedChoice,
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.from.options![0].choice).toBeDefined();
	expect(result.from.options![0].choice!.desc).toBe('Nested choice');
	expect(result.from.options![0].choice!.choose).toBe(1);
});

it('should map alignments array in option when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceApiToDomainMapper(resourceReferenceMapper);
	const alignments = [getMockResourceReferenceApiDto()];
	const option = getMockOptionApiDto({
		option_type: 'ideal',
		alignments: alignments,
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(alignments[0]);
});

it('should map all optional reference fields in option', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ChoiceApiToDomainMapper(resourceReferenceMapper);
	const of = getMockResourceReferenceApiDto();
	const abilityScore = getMockResourceReferenceApiDto();
	const damageType = getMockResourceReferenceApiDto();
	const option = getMockOptionApiDto({
		of: of,
		ability_score: abilityScore,
		damage_type: damageType,
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(of);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(abilityScore);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(damageType);
});

it('should map all primitive option properties', () => {
	// Arrange
	const mapper = new ChoiceApiToDomainMapper(getMockMapper());
	const option = getMockOptionApiDto({
		option_type: 'breath',
		action_name: 'Fire Breath',
		count: 3,
		type: 'melee',
		string: 'some string',
		desc: 'some description',
		minimum_score: 13,
		bonus: 2,
		name: 'Dragon Breath',
		dc: 15,
		damage: '2d6',
		damage_dice: '2d6',
		notes: 'some notes',
	});
	const apiDto = getMockChoiceApiDto({
		from: getMockOptionSetApiDto({ options: [option] }),
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	const mappedOption = result.from.options![0];
	expect(mappedOption.action_name).toBe('Fire Breath');
	expect(mappedOption.count).toBe(3);
	expect(mappedOption.type).toBe('melee');
	expect(mappedOption.string).toBe('some string');
	expect(mappedOption.desc).toBe('some description');
	expect(mappedOption.minimum_score).toBe(13);
	expect(mappedOption.bonus).toBe(2);
	expect(mappedOption.name).toBe('Dragon Breath');
	expect(mappedOption.dc).toBe(15);
	expect(mappedOption.damage).toBe('2d6');
	expect(mappedOption.damage_dice).toBe('2d6');
	expect(mappedOption.notes).toBe('some notes');
});
