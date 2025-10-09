import { describe, expect, it } from 'vitest';
import { LocalStorageService } from '../../src/services/LocalStorageService';
import { getMockStorage } from './testUtils/StorageTestUtils';

describe('get', () => {
	it('should return a value for existing key', () => {
		// Arrange
		const key = 'testKey';
		const value = { foo: 'bar' };
		const localStorageMock = getMockStorage({
			getItem: (k: string) => (k === key ? JSON.stringify(value) : null),
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		const result = localStorageService.get(key);

		// Assert
		expect(result).toEqual(value);
	});

	it('should return undefined for non-existing key', () => {
		// Arrange
		const key = 'nonExistingKey';
		const localStorageMock = getMockStorage({
			getItem: () => null,
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		const result = localStorageService.get(key);

		// Assert
		expect(result).toBeUndefined();
	});

	it('should map to correct type', () => {
		// Arrange
		interface TestType {
			id: number;
			name: string;
		}
		const key = 'testTypeKey';
		const value: TestType = { id: 1, name: 'Test' };
		const localStorageMock = getMockStorage({
			getItem: (k: string) => (k === key ? JSON.stringify(value) : null),
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		const result = localStorageService.get<TestType>(key);

		// Assert
		expect(result).toEqual(value);
	});
});

describe('set', () => {
	it.skip('should store a value for a key', () => {
		// TODO
	});

	it.skip('should overwrite an existing value for a key', () => {
		// TODO
	});
});

describe('delete', () => {
	it.skip('should remove a value for a key', () => {
		// TODO
	});

	it.skip('should do nothing for a non-existing key', () => {
		// TODO
	});
});

describe('getAllKeys', () => {
	it.skip('should return an array of all keys', () => {
		// TODO
	});

	it.skip('should return an empty array if no keys exist', () => {
		// TODO
	});
});
