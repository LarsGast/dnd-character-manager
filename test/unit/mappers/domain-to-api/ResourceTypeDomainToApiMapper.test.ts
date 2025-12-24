import { expect, it } from 'vitest';
import { ResourceTypeDomainToApiMapper } from '../../../../src/mappers/domain-to-api/ResourceTypeDomainToApiMapper';
import { ResourceType } from '../../../../src/types/domain/helpers/ResourceType';
import { ResourceTypeApiDto } from '../../../../src/types/api/helpers/ResourceTypeApiDto';

it.each([
	[ResourceType.AbilityScore, ResourceTypeApiDto.AbilityScore],
	[ResourceType.Alignment, ResourceTypeApiDto.Alignment],
	[ResourceType.Background, ResourceTypeApiDto.Background],
	[ResourceType.Class, ResourceTypeApiDto.Class],
	[ResourceType.Equipment, ResourceTypeApiDto.Equipment],
	[ResourceType.EquipmentCategory, ResourceTypeApiDto.EquipmentCategory],
	[ResourceType.Feature, ResourceTypeApiDto.Feature],
	[ResourceType.Language, ResourceTypeApiDto.Language],
	[ResourceType.Proficiency, ResourceTypeApiDto.Proficiency],
	[ResourceType.Race, ResourceTypeApiDto.Race],
	[ResourceType.Skill, ResourceTypeApiDto.Skill],
	[ResourceType.Spell, ResourceTypeApiDto.Spell],
	[ResourceType.Subclass, ResourceTypeApiDto.Subclass],
	[ResourceType.Subrace, ResourceTypeApiDto.Subrace],
	[ResourceType.Trait, ResourceTypeApiDto.Trait],
])(
	'should map ResourceType %s to ResourceTypeApiDto %s',
	(domainType, apiDtoType) => {
		// Arrange
		const mapper = new ResourceTypeDomainToApiMapper();

		// Act
		const result = mapper.map(domainType);

		// Assert
		expect(result).toBe(apiDtoType);
	},
);

it('should map to all defined ResourceTypeApiDto values', () => {
	// Arrange
	const mapper = new ResourceTypeDomainToApiMapper();
	const allApiDtoValues = Object.values(ResourceTypeApiDto).filter(
		(value) => typeof value === 'number',
	) as ResourceTypeApiDto[];

	// Act
	const mappedValues = new Set<ResourceTypeApiDto>();
	for (const resourceType in ResourceType) {
		const numericKey = Number(resourceType);
		if (!isNaN(numericKey)) {
			try {
				const apiDto = mapper.map(numericKey as ResourceType);
				mappedValues.add(apiDto);
			} catch {
				// Ignore unmapped types
			}
		}
	}

	// Assert
	expect(mappedValues.size).toBe(allApiDtoValues.length);
	for (const apiDtoValue of allApiDtoValues) {
		expect(mappedValues.has(apiDtoValue)).toBe(true);
	}
});

it('should throw an error if no API equivalent exists', () => {
	// Arrange
	const mapper = new ResourceTypeDomainToApiMapper();
	const unmappedResourceType = ResourceType.Armor;

	// Act & Assert
	expect(() => mapper.map(unmappedResourceType)).toThrow();
});
