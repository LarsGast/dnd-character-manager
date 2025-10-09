// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { LocalStorageService } from '../../../src/services/LocalStorageService';

afterEach(() => {
	window.localStorage.clear();
});

describe('set -> get', () => {
	it('should set and get a primitive value', () => {
		// Arrange
		const localStorageService = new LocalStorageService(window.localStorage);
		const key = 'testKey';
		const value = 'testValue';

		// Act
		localStorageService.set(key, value);
		const result = localStorageService.get<string>(key);

		// Assert
		expect(result).toBe(value);
	});

	it('should set and get an object', () => {
		// Arrange
		const localStorageService = new LocalStorageService(window.localStorage);
		const key = 'testObjectKey';
		const value = { foo: 'bar', num: 42 };

		// Act
		localStorageService.set(key, value);
		const result = localStorageService.get<{ foo: string; num: number }>(key);

		// Assert
		expect(result).toEqual(value);
	});

	it('should get and set a typed object', () => {
		// Arrange
		interface TestType {
			id: number;
			name: string;
		}
		const localStorageService = new LocalStorageService(window.localStorage);
		const key = 'testTypedKey';
		const value: TestType = { id: 1, name: 'Test' };

		// Act
		localStorageService.set(key, value);
		const result = localStorageService.get<TestType>(key);

		// Assert
		expect(result).toEqual(value);
	});
});

describe('set -> set -> get', () => {
	it('should overwrite an existing value', () => {
		// Arrange
		const localStorageService = new LocalStorageService(window.localStorage);
		const key = 'overwriteKey';
		const initialValue = 'initialValue';
		const newValue = 'newValue';

		// Act
		localStorageService.set(key, initialValue);
		localStorageService.set(key, newValue);
		const result = localStorageService.get<string>(key);

		// Assert
		expect(result).toBe(newValue);
	});
});

describe('set -> delete -> get', () => {
	it('should delete an existing value', () => {
		// Arrange
		const localStorageService = new LocalStorageService(window.localStorage);
		const key = 'deleteKey';
		const value = 'toBeDeleted';
		localStorageService.set(key, value);

		// Act
		localStorageService.delete(key);
		const result = localStorageService.get<string>(key);

		// Assert
		expect(result).toBeUndefined();
	});
});

describe('set -> set -> getAllKeys', () => {
	it('should return all keys in storage', () => {
		// Arrange
		const localStorageService = new LocalStorageService(window.localStorage);
		const key1 = 'key1';
		const key2 = 'key2';
		localStorageService.set(key1, 'value1');
		localStorageService.set(key2, 'value2');

		// Act
		const result = localStorageService.getAllKeys();

		// Assert
		expect(result).toEqual([key1, key2]);
	});
});
