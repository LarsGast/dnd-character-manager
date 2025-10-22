import { it, expect } from 'vitest';
import { ResourceReferenceRecordToDomainMapper } from '../../../../src/mappers/record/ResourceReferenceRecordToDomainMapper';
import { getMockResourceReferenceRecord } from './testUtils/RecordTypeTestUtils';

it('should map all properties from record to domain correctly', () => {
	// Arrange
	const mapper = new ResourceReferenceRecordToDomainMapper();
	const record = getMockResourceReferenceRecord({
		id: 'ref-id-456',
		name: 'Reference Name',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.index).toBe('ref-id-456');
	expect(result.name).toBe('Reference Name');
});

it('should always set isHomebrew to true for record resources', () => {
	// Arrange
	const mapper = new ResourceReferenceRecordToDomainMapper();
	const record = getMockResourceReferenceRecord();

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.isHomebrew).toBe(true);
});

it('should map id to index property', () => {
	// Arrange
	const mapper = new ResourceReferenceRecordToDomainMapper();
	const record = getMockResourceReferenceRecord({
		id: 'unique-reference-id',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.index).toBe('unique-reference-id');
});
