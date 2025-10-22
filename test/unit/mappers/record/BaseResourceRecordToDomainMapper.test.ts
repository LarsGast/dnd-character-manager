import { it, expect } from 'vitest';
import { BaseResourceRecordToDomainMapper } from '../../../../src/mappers/record/BaseResourceRecordToDomainMapper';
import { getMockBaseResourceRecord } from './testUtils/RecordTypeTestUtils';

it('should map all properties from record to domain correctly', () => {
	// Arrange
	const mapper = new BaseResourceRecordToDomainMapper();
	const record = getMockBaseResourceRecord({
		id: 'test-id-123',
		name: 'Test Name',
		notes: 'Some custom notes',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.index).toBe('test-id-123');
	expect(result.name).toBe('Test Name');
	expect(result.notes).toBe('Some custom notes');
});

it('should always set isHomebrew to true for record resources', () => {
	// Arrange
	const mapper = new BaseResourceRecordToDomainMapper();
	const record = getMockBaseResourceRecord();

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.isHomebrew).toBe(true);
});

it('should handle undefined notes', () => {
	// Arrange
	const mapper = new BaseResourceRecordToDomainMapper();
	const record = getMockBaseResourceRecord({
		notes: undefined,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.notes).toBeUndefined();
});

it('should map id to index property', () => {
	// Arrange
	const mapper = new BaseResourceRecordToDomainMapper();
	const record = getMockBaseResourceRecord({
		id: 'unique-record-id',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.index).toBe('unique-record-id');
});
