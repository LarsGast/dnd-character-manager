import { describe, expect, it, test } from 'vitest';

describe('basic arithmetic', () => {
	test('should return true for 1 + 1 equals 2', () => {
		expect(1 + 1).toBe(2);
	});

	test('should return true for 2 * 2 equals 4', () => {
		expect(2 * 2).toBe(4);
	});
});

describe('string operations', () => {
	test('should return true for string concatenation', () => {
		expect('Hello, ' + 'World!').toBe('Hello, World!');
	});

	test('should return true for string length', () => {
		expect('Vitest'.length).toBe(6);
	});
});

test('array contains specific element', () => {
	const fruits = ['apple', 'banana', 'orange'];
	expect(fruits).toContain('banana');
});

// test('failed test example', () => {
// 	expect(1 + 1).toBe(3); // This test is expected to fail
// });

// test('another failed test example', () => {
// 	expect('Hello'.toUpperCase()).toBe('HELLOO'); // This test is expected to fail
// });

it.skip('skipped test example', () => {
	expect(true).toBe(false); // This test will be skipped
});

test.todo('this is a todo test that needs to be implemented');
