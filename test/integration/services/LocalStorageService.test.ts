// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { localStorageService } from '../../../src/wiring/dependencies';

afterEach(() => {
	window.localStorage.clear();
});

describe('set -> get', () => {
	it('should set and get a primitive value', () => {
		// Arrange
		localStorageService.set('key', 'value');

		// Act
		const result = localStorageService.get<string>('key');

		// Assert
		expect(result).toBe('value');
	});

	it('should set and get an object', () => {
		// Arrange
		localStorageService.set('key', { foo: 'bar', num: 42 });

		// Act
		const result = localStorageService.get('key');

		// Assert
		expect(result).toEqual({ foo: 'bar', num: 42 });
	});

	it('should get and set a typed object', () => {
		// Arrange
		interface TestType {
			id: number;
			name: string;
		}
		const value: TestType = { id: 1, name: 'Test' };
		localStorageService.set('key', value);

		// Act
		const result = localStorageService.get<TestType>('key');

		// Assert
		const expected: TestType = { id: 1, name: 'Test' };
		expect(result).toEqual(expected);
	});
});

describe('set -> set -> get', () => {
	it('should overwrite an existing value', () => {
		// Arrange
		localStorageService.set('key', 'initialValue');
		localStorageService.set('key', 'newValue');

		// Act
		const result = localStorageService.get<string>('key');

		// Assert
		expect(result).toBe('newValue');
	});
});

describe('set -> delete -> get', () => {
	it('should delete an existing value', () => {
		// Arrange
		localStorageService.set('key', 'value');
		localStorageService.delete('key');

		// Act
		const result = localStorageService.get<string>('key');

		// Assert
		expect(result).toBeUndefined();
	});
});

describe('set -> set -> getAllKeys', () => {
	it('should return all keys in storage', () => {
		// Arrange
		localStorageService.set('key1', 'value1');
		localStorageService.set('key2', 'value2');

		// Act
		const result = localStorageService.getAllKeys();

		// Assert
		expect(result).toEqual(['key1', 'key2']);
	});
});
