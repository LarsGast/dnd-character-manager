import { it, expect } from 'vitest';
import { LanguageApiToDomainMapper } from '../../../../src/mappers/api/LanguageApiToDomainMapper';
import { getMockLanguageApiDto } from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new LanguageApiToDomainMapper(getMockMapper());
	const apiDto = getMockLanguageApiDto({
		desc: 'Ancient language',
		type: 'Exotic',
		script: 'Draconic',
		typical_speakers: ['Dragons', 'Dragonborn'],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toBe('Ancient language');
	expect(result.type).toBe('Exotic');
	expect(result.script).toBe('Draconic');
	expect(result.typical_speakers).toEqual(['Dragons', 'Dragonborn']);
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new LanguageApiToDomainMapper(baseResourceMapper);
	const apiDto = getMockLanguageApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should handle empty typical_speakers array', () => {
	// Arrange
	const mapper = new LanguageApiToDomainMapper(getMockMapper());
	const apiDto = getMockLanguageApiDto({
		typical_speakers: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.typical_speakers).toEqual([]);
});
