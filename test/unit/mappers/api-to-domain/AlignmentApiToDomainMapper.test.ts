import { it, expect } from 'vitest';
import { AlignmentApiToDomainMapper } from '../../../../src/mappers/api-to-domain/AlignmentApiToDomainMapper';
import { getMockAlignmentApiDto } from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new AlignmentApiToDomainMapper(getMockMapper());
	const apiDto = getMockAlignmentApiDto({
		abbreviation: 'LG',
		desc: 'Lawful Good description',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.abbreviation).toBe('LG');
	expect(result.desc).toBe('Lawful Good description');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new AlignmentApiToDomainMapper(baseResourceMapper);
	const apiDto = getMockAlignmentApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});
