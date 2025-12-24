import { it, expect } from 'vitest';
import { SubclassApiToDomainMapper } from '../../../../src/mappers/api-to-domain/SubclassApiToDomainMapper';
import {
	getMockSubclassApiDto,
	getMockResourceReferenceApiDto,
	getMockSubclassSpellApiDto,
	getMockSubClassSpellPrerequisiteApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubclassApiDto({
		desc: ['Subclass description line 1', 'Subclass description line 2'],
		subclass_flavor: 'Some flavorful text',
		subclass_levels: '/api/subclasses/champion/levels',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Subclass description line 1',
		'Subclass description line 2',
	]);
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new SubclassApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockSubclassApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map class reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classRef = getMockResourceReferenceApiDto();
	const apiDto = getMockSubclassApiDto({
		class: classRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classRef);
});

it('should map spells array and extract level from prerequisites', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const spell = getMockSubclassSpellApiDto({
		prerequisites: [
			getMockSubClassSpellPrerequisiteApiDto({
				index: 'lore-3',
				name: 'Level 3',
				type: 'level',
			}),
		],
	});
	const apiDto = getMockSubclassApiDto({
		spells: [spell],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spells).toHaveLength(1);
	expect(result.spells[0].level).toBe(3);
});

it('should handle empty spells array', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubclassApiDto({
		spells: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spells).toEqual([]);
});

it('should always set features to empty array', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubclassApiDto();

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.features).toEqual([]);
});

it('should map spell reference in subclass spells', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const spellRef = getMockResourceReferenceApiDto();
	const spell = getMockSubclassSpellApiDto({
		spell: spellRef,
	});
	const apiDto = getMockSubclassApiDto({
		spells: [spell],
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(spellRef);
});

it('should handle undefined spells array', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubclassApiDto();
	apiDto.spells = undefined;

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spells).toEqual([]);
});

it('should handle empty prerequisites in subclass spell', () => {
	// Arrange
	const mapper = new SubclassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const spell = getMockSubclassSpellApiDto({
		prerequisites: [],
	});
	const apiDto = getMockSubclassApiDto({
		spells: [spell],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spells).toHaveLength(1);
	expect(result.spells[0].level).toBe(0);
});
