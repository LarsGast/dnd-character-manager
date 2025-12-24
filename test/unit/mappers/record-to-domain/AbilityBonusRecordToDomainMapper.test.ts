import { AbilityBonusRecordToDomainMapper } from '../../../../src/mappers/record-to-domain/AbilityBonusRecordToDomainMapper';
import { it, expect } from 'vitest';
import {
	getMockAbilityBonusRecord,
	getMockResourceReferenceRecord,
} from './testUtils/RecordTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from record to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusRecordToDomainMapper = new AbilityBonusRecordToDomainMapper(
		resourceReferenceMapper,
	);

	const record = getMockAbilityBonusRecord({
		bonus: 5,
	});

	// Act
	const result = abilityBonusRecordToDomainMapper.map(record);

	// Assert
	expect(result.bonus).toBe(5);
});

it('should map all reference properties from record to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const abilityBonusRecordToDomainMapper = new AbilityBonusRecordToDomainMapper(
		resourceReferenceMapper,
	);

	const mockAbilityScore = getMockResourceReferenceRecord();
	const record = getMockAbilityBonusRecord({
		ability_score: mockAbilityScore,
	});

	// Act
	abilityBonusRecordToDomainMapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(mockAbilityScore);
});
