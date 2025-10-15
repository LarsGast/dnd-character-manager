import { it, expect } from 'vitest';
import { BaseResourceApiToDomainMapper } from '../../../../src/mappers/api/BaseResourceApiToDomainMapper';
import { getMockBaseResourceApiDto } from './testUtils/ApiTypeTestUtils';

it('should map all properties from API to domain correctly', () => {
	// Arrange
	const mapper = new BaseResourceApiToDomainMapper();
	const apiDto = getMockBaseResourceApiDto({
		index: 'test-index',
		name: 'Test Name',
		url: '/api/test/test-index',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.index).toBe('test-index');
	expect(result.name).toBe('Test Name');
	expect(result.isHomebrew).toBe(false);
	expect(result.notes).toBeUndefined();
});

it('should always set isHomebrew to false for API resources', () => {
	// Arrange
	const mapper = new BaseResourceApiToDomainMapper();
	const apiDto = getMockBaseResourceApiDto();

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.isHomebrew).toBe(false);
});

it('should always set notes to undefined for API resources', () => {
	// Arrange
	const mapper = new BaseResourceApiToDomainMapper();
	const apiDto = getMockBaseResourceApiDto();

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.notes).toBeUndefined();
});
