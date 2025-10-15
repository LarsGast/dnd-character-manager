import { it, expect } from 'vitest';
import { AbilityScoreApiToDomainMapper } from '../../../../src/mappers/api/AbilityScoreApiToDomainMapper';
import {
	getMockAbilityScoreApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const abilityBonusApiToDomainMapper = new AbilityScoreApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);

	const apiDto = getMockAbilityScoreApiDto({
		desc: 'Some description',
		full_name: 'Full Ability Name',
	});

	// Act
	const result = abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(result.desc).toBe('Some description');
	expect(result.full_name).toBe('Full Ability Name');
});

it('should map all reference properties from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityScoreApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);

	const skills = [getMockResourceReferenceApiDto()];
	const apiDto = getMockAbilityScoreApiDto({
		skills: skills,
	});

	// Act
	abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(skills[0]);
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityScoreApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);

	const apiDto = getMockAbilityScoreApiDto();

	// Act
	abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map multiple skills references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityScoreApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);

	const skills = [
		getMockResourceReferenceApiDto(),
		getMockResourceReferenceApiDto(),
	];
	const apiDto = getMockAbilityScoreApiDto({
		skills: skills,
	});

	// Act
	abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledTimes(2);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(skills[0]);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(skills[1]);
});

it('should handle empty skills array', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityScoreApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);

	const apiDto = getMockAbilityScoreApiDto({
		skills: [],
	});

	// Act
	const result = abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(result.skills).toEqual([]);
	expect(resourceReferenceMapper.map).not.toHaveBeenCalled();
});
