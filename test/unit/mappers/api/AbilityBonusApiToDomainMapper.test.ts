import { AbilityBonusApiToDomainMapper } from '../../../../src/mappers/api/AbilityBonusApiToDomainMapper';
import { it, expect } from 'vitest';
import {
	getMockAbilityBonusApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityBonusApiToDomainMapper(
		resourceReferenceMapper,
	);

	const apiDto = getMockAbilityBonusApiDto({
		bonus: 5,
	});

	// Act
	const result = abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(result.bonus).toBe(5);
});

it('should map all reference properties from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusApiToDomainMapper = new AbilityBonusApiToDomainMapper(
		resourceReferenceMapper,
	);

	const mockAbilityScore = getMockResourceReferenceApiDto();
	const apiDto = getMockAbilityBonusApiDto({
		ability_score: mockAbilityScore,
	});

	// Act
	abilityBonusApiToDomainMapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(mockAbilityScore);
});
