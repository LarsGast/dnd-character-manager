// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cacheService } from '../../../src/wiring/dependencies';

afterEach(() => {
	window.localStorage.clear();
});

describe('set -> get', () => {
	it('should set and get a primitive value', () => {
		// Arrange
		cacheService.set('key', 'testValue');

		// Act
		const result = cacheService.get<string>('key');

		// Assert
		expect(result).toBe('testValue');
	});

	it('should set and get an object', () => {
		// Arrange
		cacheService.set('key', { foo: 'bar', num: 42 });

		// Act
		const result = cacheService.get('key');

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
		cacheService.set('key', value);

		// Act
		const result = cacheService.get<TestType>('key');

		// Assert
		const expected: TestType = { id: 1, name: 'Test' };
		expect(result).toEqual(expected);
	});
});

describe('set -> set -> get', () => {
	it('should overwrite an existing value', () => {
		// Arrange
		cacheService.set('key', 'initialValue');
		cacheService.set('key', 'newValue');

		// Act
		const result = cacheService.get<string>('key');

		// Assert
		expect(result).toBe('newValue');
	});
});

describe('set -> delete -> get', () => {
	it('should delete an existing value', () => {
		// Arrange
		cacheService.set('key', 'value');
		cacheService.delete('key');

		// Act
		const result = cacheService.get<string>('key');

		// Assert
		expect(result).toBeUndefined();
	});
});
