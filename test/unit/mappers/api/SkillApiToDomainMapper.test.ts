import { it, expect } from 'vitest';
import { SkillApiToDomainMapper } from '../../../../src/mappers/api/SkillApiToDomainMapper';
import {
	getMockSkillApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new SkillApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSkillApiDto({
		desc: ['Skill description line 1', 'Skill description line 2'],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Skill description line 1',
		'Skill description line 2',
	]);
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new SkillApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockSkillApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map ability_score reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SkillApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const abilityScore = getMockResourceReferenceApiDto();
	const apiDto = getMockSkillApiDto({
		ability_score: abilityScore,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(abilityScore);
});
