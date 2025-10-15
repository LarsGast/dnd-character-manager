import { it, expect } from 'vitest';
import { ClassLevelApiToDomainMapper } from '../../../../src/mappers/api/ClassLevelApiToDomainMapper';
import {
	getMockClassLevelApiDto,
	getMockResourceReferenceApiDto,
	getMockSpellcastingApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassLevelApiDto({
		level: 3,
		ability_score_bonuses: 1,
		prof_bonus: 2,
		class_specific: { rage_count: 3 },
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.level).toBe(3);
	expect(result.ability_score_bonuses).toBe(1);
	expect(result.prof_bonus).toBe(2);
	expect(result.class_specific).toEqual({ rage_count: 3 });
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new ClassLevelApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockClassLevelApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map class reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classRef = getMockResourceReferenceApiDto();
	const apiDto = getMockClassLevelApiDto({
		class: classRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classRef);
});

it('should map features array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const features = [getMockResourceReferenceApiDto()];
	const apiDto = getMockClassLevelApiDto({
		features: features,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(features[0]);
});

it('should handle empty features array', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const apiDto = getMockClassLevelApiDto({
		features: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.features).toEqual([]);
});

it('should map spellcasting properties when present', () => {
	// Arrange
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const spellcasting = getMockSpellcastingApiDto({
		cantrips_known: 3,
		spells_known: 5,
		spell_slots_level_1: 4,
		spell_slots_level_2: 3,
	});
	const apiDto = getMockClassLevelApiDto({
		spellcasting: spellcasting,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spellcasting).toBeDefined();
	expect(result.spellcasting?.cantrips_known).toBe(3);
	expect(result.spellcasting?.spells_known).toBe(5);
	expect(result.spellcasting?.spell_slots_level_1).toBe(4);
	expect(result.spellcasting?.spell_slots_level_2).toBe(3);
});

it('should handle undefined spellcasting', () => {
	// Arrange
	const mapper = new ClassLevelApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassLevelApiDto({
		spellcasting: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spellcasting).toBeUndefined();
});
