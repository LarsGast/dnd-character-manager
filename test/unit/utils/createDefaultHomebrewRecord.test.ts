import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { createDefaultHomebrewRecord } from '../../../src/utils/createDefaultHomebrewRecord';
import { ResourceTypeRecord } from '../../../src/types/storage/helpers/ResourceTypeRecord';
import { RaceRecord } from '../../../src/types/storage/resources/RaceRecord';
import { SubclassRecord } from '../../../src/types/storage/resources/SubclassRecord';
import { HOMEBREW_RESOURCE_RECORD_VERSION } from '../../../src/types/storage/wrappers/BaseResourceRecord';

describe('createDefaultHomebrewRecord', () => {
	let randomUUIDSpy: any;

	beforeEach(() => {
		// Mock crypto.randomUUID for consistent testing
		randomUUIDSpy = vi
			.spyOn(globalThis.crypto, 'randomUUID')
			.mockReturnValue('test-uuid-1234-5678-90ab');
	});

	afterEach(() => {
		randomUUIDSpy.mockRestore();
	});

	describe('Race resource type', () => {
		it('should create a Race record with all required properties initialized', () => {
			// Act
			const result = createDefaultHomebrewRecord(
				ResourceTypeRecord.Race,
			) as RaceRecord;

			// Assert
			expect(result.version).toBe(HOMEBREW_RESOURCE_RECORD_VERSION);
			expect(result.id).toBe('test-uuid-1234-5678-90ab');
			expect(result.name).toBe('New Custom Object');
			expect(result.resourceType).toBe(ResourceTypeRecord.Race);
			expect(result.speed).toBe(30);
			expect(result.ability_bonuses).toEqual([]);
			expect(result.age).toBe('');
			expect(result.alignment).toBe('');
			expect(result.size).toBe('Medium');
			expect(result.size_description).toBe('');
			expect(result.languages).toEqual([]);
			expect(result.language_desc).toBe('');
			expect(result.traits).toEqual([]);
		});

		it('should create a Race record that can be safely mapped without errors', () => {
			// Act
			const result = createDefaultHomebrewRecord(
				ResourceTypeRecord.Race,
			) as RaceRecord;

			// Assert - Verify array properties can be mapped
			expect(() => result.ability_bonuses.map((ab) => ab)).not.toThrow();
			expect(() => result.languages.map((lang) => lang)).not.toThrow();
			expect(() => result.traits.map((trait) => trait)).not.toThrow();
		});
	});

	describe('Subclass resource type', () => {
		it('should create a Subclass record with all required properties initialized', () => {
			// Act
			const result = createDefaultHomebrewRecord(
				ResourceTypeRecord.Subclass,
			) as SubclassRecord;

			// Assert
			expect(result.version).toBe(HOMEBREW_RESOURCE_RECORD_VERSION);
			expect(result.id).toBe('test-uuid-1234-5678-90ab');
			expect(result.name).toBe('New Custom Object');
			expect(result.resourceType).toBe(ResourceTypeRecord.Subclass);
			expect(result.class).toEqual({ id: '', name: '' });
			expect(result.desc).toEqual([]);
			expect(result.spells).toEqual([]);
			expect(result.features).toEqual([]);
		});

		it('should create a Subclass record that can be safely mapped without errors', () => {
			// Act
			const result = createDefaultHomebrewRecord(
				ResourceTypeRecord.Subclass,
			) as SubclassRecord;

			// Assert - Verify array properties can be mapped
			expect(() => result.desc.map((d) => d)).not.toThrow();
			expect(() => result.spells.map((spell) => spell)).not.toThrow();
			expect(() => result.features.map((feature) => feature)).not.toThrow();
			// Verify class reference has required properties
			expect(result.class.id).toBeDefined();
			expect(result.class.name).toBeDefined();
		});
	});

	describe('Base properties', () => {
		it('should generate a unique UUID for each call', () => {
			// Arrange
			randomUUIDSpy.mockReturnValueOnce('uuid-1').mockReturnValueOnce('uuid-2');

			// Act
			const result1 = createDefaultHomebrewRecord(ResourceTypeRecord.Race);
			const result2 = createDefaultHomebrewRecord(ResourceTypeRecord.Race);

			// Assert
			expect(result1.id).toBe('uuid-1');
			expect(result2.id).toBe('uuid-2');
		});

		it('should use the correct version number', () => {
			// Act
			const result = createDefaultHomebrewRecord(ResourceTypeRecord.Race);

			// Assert
			expect(result.version).toBe(HOMEBREW_RESOURCE_RECORD_VERSION);
		});

		it('should set the correct resource type', () => {
			// Act
			const raceResult = createDefaultHomebrewRecord(ResourceTypeRecord.Race);
			const subclassResult = createDefaultHomebrewRecord(
				ResourceTypeRecord.Subclass,
			);

			// Assert
			expect(raceResult.resourceType).toBe(ResourceTypeRecord.Race);
			expect(subclassResult.resourceType).toBe(ResourceTypeRecord.Subclass);
		});
	});
});
