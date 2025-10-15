import { it, expect } from 'vitest';
import { ProficiencyApiToDomainMapper } from '../../../../src/mappers/api/ProficiencyApiToDomainMapper';
import {
	getMockProficiencyApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockProficiencyApiDto({
		type: 'Armor',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.type).toBe('Armor');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockProficiencyApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map classes array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classes = [getMockResourceReferenceApiDto()];
	const apiDto = getMockProficiencyApiDto({
		classes: classes,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classes[0]);
});

it('should map races array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const races = [getMockResourceReferenceApiDto()];
	const apiDto = getMockProficiencyApiDto({
		races: races,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(races[0]);
});

it('should map reference property from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const reference = getMockResourceReferenceApiDto();
	const apiDto = getMockProficiencyApiDto({
		reference: reference,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(reference);
});

it('should handle empty classes array', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const apiDto = getMockProficiencyApiDto({
		classes: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.classes).toEqual([]);
});

it('should handle empty races array', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const apiDto = getMockProficiencyApiDto({
		races: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.races).toEqual([]);
});

it('should map multiple classes references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classes = [
		getMockResourceReferenceApiDto(),
		getMockResourceReferenceApiDto(),
	];
	const apiDto = getMockProficiencyApiDto({
		classes: classes,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledTimes(4); // 2 classes + 2 races (from default) + 1 reference = 5, but we're resetting the mock
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classes[0]);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classes[1]);
});

it('should map multiple races references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ProficiencyApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const races = [
		getMockResourceReferenceApiDto(),
		getMockResourceReferenceApiDto(),
	];
	const apiDto = getMockProficiencyApiDto({
		races: races,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(races[0]);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(races[1]);
});
