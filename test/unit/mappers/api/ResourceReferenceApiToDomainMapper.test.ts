import { it, expect } from 'vitest';
import { ResourceReferenceApiToDomainMapper } from '../../../../src/mappers/api/ResourceReferenceApiToDomainMapper';
import { getMockResourceReferenceApiDto } from './testUtils/ApiTypeTestUtils';

it('should map all properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ResourceReferenceApiToDomainMapper();
	const apiDto = getMockResourceReferenceApiDto({
		index: 'dex',
		name: 'Dexterity',
		url: '/api/ability-scores/dex',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.index).toBe('dex');
	expect(result.name).toBe('Dexterity');
});

it('should always set isHomebrew to false for API resources', () => {
	// Arrange
	const mapper = new ResourceReferenceApiToDomainMapper();
	const apiDto = getMockResourceReferenceApiDto();

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.isHomebrew).toBe(false);
});
