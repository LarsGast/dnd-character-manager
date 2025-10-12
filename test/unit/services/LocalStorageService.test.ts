import { describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from '../../../src/services/LocalStorageService';
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
	it('should store a value for a key', () => {
		// Arrange
		const key = 'testKey';
		const value = { foo: 'bar' };
		const setItemMock = vi.fn();
		const localStorageMock = getMockStorage({
			setItem: setItemMock,
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		localStorageService.set(key, value);

		// Assert
		expect(setItemMock).toHaveBeenCalledWith(key, JSON.stringify(value));
	});
});

describe('delete', () => {
	it('should remove a value for a key', () => {
		// Arrange
		const key = 'testKey';
		const removeItemMock = vi.fn();
		const localStorageMock = getMockStorage({
			removeItem: removeItemMock,
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		localStorageService.delete(key);

		// Assert
		expect(removeItemMock).toHaveBeenCalledWith(key);
	});
});

describe('getAllKeys', () => {
	it('should return an array of all keys', () => {
		// Arrange
		const keys = ['key1', 'key2', 'key3'];
		const localStorageMock = getMockStorage({
			length: keys.length,
			key: (index: number) => keys[index] || null,
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		const result = localStorageService.getAllKeys();

		// Assert
		expect(result).toEqual(keys);
	});

	it('should return an empty array if no keys exist', () => {
		// Arrange
		const localStorageMock = getMockStorage({
			length: 0,
		});
		const localStorageService = new LocalStorageService(localStorageMock);

		// Act
		const result = localStorageService.getAllKeys();

		// Assert
		expect(result).toEqual([]);
	});
});
