import { expect, it } from 'vitest';
import { ResourceTypeDomainToRecordMapper } from '../../../../src/mappers/domain-to-record/ResourceTypeDomainToRecordMapper';
import { ResourceType } from '../../../../src/types/domain/helpers/ResourceType';
import { ResourceTypeRecord } from '../../../../src/types/storage/helpers/ResourceTypeRecord';

it.each([
	[ResourceType.Race, ResourceTypeRecord.Race],
	[ResourceType.Subclass, ResourceTypeRecord.Subclass],
])(
	'should map ResourceType %s to ResourceTypeRecord %s',
	(domainType, recordType) => {
		// Arrange
		const mapper = new ResourceTypeDomainToRecordMapper();

		// Act
		const result = mapper.map(domainType);

		// Assert
		expect(result).toBe(recordType);
	},
);

it('should map to all defined ResourceTypeRecord values', () => {
	// Arrange
	const mapper = new ResourceTypeDomainToRecordMapper();
	const allRecordValues = Object.values(ResourceTypeRecord).filter(
		(value) => typeof value === 'number',
	) as ResourceTypeRecord[];

	// Act
	const mappedValues = new Set<ResourceTypeRecord>();
	for (const resourceType in ResourceType) {
		const numericKey = Number(resourceType);
		if (!isNaN(numericKey)) {
			try {
				const record = mapper.map(numericKey as ResourceType);
				mappedValues.add(record);
			} catch {
				// Ignore unmapped types
			}
		}
	}

	// Assert
	expect(mappedValues.size).toBe(allRecordValues.length);
	for (const recordValue of allRecordValues) {
		expect(mappedValues.has(recordValue)).toBe(true);
	}
});

it('should throw an error if no record equivalent exists', () => {
	// Arrange
	const mapper = new ResourceTypeDomainToRecordMapper();
	const unmappedResourceType = ResourceType.Armor;

	// Act & Assert
	expect(() => mapper.map(unmappedResourceType)).toThrow();
});
